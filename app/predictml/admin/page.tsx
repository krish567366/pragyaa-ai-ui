'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContextProvider';
import { motion } from 'framer-motion';

interface UploadedFile {
  id: string;
  filename: string;
  filePath: string;
  uploadDate: string;
  clientEmail: string;
  status: 'pending_review' | 'approved' | 'training' | 'trained' | 'rejected';
  dataInfo?: {
    rows: number;
    columns: number;
    quality: string;
  };
}

export default function AdminPanel() {
  const router = useRouter();
  const { user, isAuthenticated, logout, loading: authLoading } = useAuth();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/predictml/login');
    } else if (!authLoading && isAuthenticated && user?.email !== 'admin@predictml.com') {
      // Only admin can access this page
      router.push('/predictml/dashboard');
    }
  }, [isAuthenticated, authLoading, router, user]);

  useEffect(() => {
    if (isAuthenticated && user?.email === 'admin@predictml.com') {
      loadUploadedFiles();
    }
  }, [isAuthenticated, user]);

  const loadUploadedFiles = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('predictMLToken');
      const response = await fetch('/api/predictml/admin/files', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFiles(data.files || []);
      }
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFileStatus = async (fileId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('predictMLToken');
      const response = await fetch('/api/predictml/admin/update-status', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileId, status: newStatus }),
      });

      if (response.ok) {
        await loadUploadedFiles();
        alert(`File status updated to: ${newStatus}`);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_review': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'approved': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'training': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'trained': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-purple-300 text-sm">Data Management & Training Control</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-white font-semibold">{user?.name || 'Admin'}</p>
              <p className="text-purple-300 text-sm">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Files List */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20"
            >
              <h2 className="text-xl font-bold text-white mb-6">Uploaded Files Queue</h2>
              
              {files.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p>No files uploaded yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {files.map((file) => (
                    <motion.div
                      key={file.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedFile?.id === file.id
                          ? 'bg-purple-500/20 border-purple-500'
                          : 'bg-gray-800/50 border-gray-700 hover:border-purple-500/50'
                      }`}
                      onClick={() => setSelectedFile(file)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-white font-semibold">{file.filename}</h3>
                          <p className="text-purple-300 text-sm">{file.clientEmail}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(file.status)}`}>
                          {file.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="text-gray-400 text-sm">
                        <p>Uploaded: {file.uploadDate}</p>
                        {file.dataInfo && (
                          <p>Data: {file.dataInfo.rows} rows × {file.dataInfo.columns} columns</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* File Details & Actions */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 sticky top-4"
            >
              <h2 className="text-xl font-bold text-white mb-6">File Actions</h2>
              
              {!selectedFile ? (
                <div className="text-center py-12 text-gray-400">
                  <p>Select a file to view details and actions</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">{selectedFile.filename}</h3>
                    <div className="text-sm text-gray-300 space-y-1">
                      <p><span className="text-purple-300">Client:</span> {selectedFile.clientEmail}</p>
                      <p><span className="text-purple-300">Upload Date:</span> {selectedFile.uploadDate}</p>
                      <p><span className="text-purple-300">Status:</span> {selectedFile.status}</p>
                      {selectedFile.dataInfo && (
                        <>
                          <p><span className="text-purple-300">Rows:</span> {selectedFile.dataInfo.rows}</p>
                          <p><span className="text-purple-300">Columns:</span> {selectedFile.dataInfo.columns}</p>
                          <p><span className="text-purple-300">Quality:</span> {selectedFile.dataInfo.quality}</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-white font-semibold mb-3">Update Status:</h4>
                    
                    {selectedFile.status === 'pending_review' && (
                      <>
                        <button
                          onClick={() => updateFileStatus(selectedFile.id, 'approved')}
                          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          ✓ Approve for Training
                        </button>
                        <button
                          onClick={() => updateFileStatus(selectedFile.id, 'rejected')}
                          className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          ✗ Reject
                        </button>
                      </>
                    )}

                    {selectedFile.status === 'approved' && (
                      <button
                        onClick={() => updateFileStatus(selectedFile.id, 'training')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        🚀 Start Training
                      </button>
                    )}

                    {selectedFile.status === 'training' && (
                      <button
                        onClick={() => updateFileStatus(selectedFile.id, 'trained')}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        ✅ Mark as Trained
                      </button>
                    )}

                    {selectedFile.status === 'trained' && (
                      <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 text-center">
                        <p className="text-purple-300">✅ Model is trained and ready for predictions</p>
                      </div>
                    )}

                    {selectedFile.status === 'rejected' && (
                      <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-center">
                        <p className="text-red-300">❌ This file has been rejected</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <a
                      href={`/api/predictml/admin/download/${selectedFile.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block text-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      📥 Download File
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
