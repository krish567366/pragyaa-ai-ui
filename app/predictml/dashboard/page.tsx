'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ProductNav from '../../components/ProductNav';
import ValidationResults from '../../components/ValidationResults';
import { useAuth } from '../../context/AuthContextProvider';

interface Report {
  id: string;
  filename: string;
  uploadDate: string;
  status: 'processing' | 'ready' | 'pending';
  downloadUrl?: string;
}

export default function PredictMLDashboard() {
  const { user, isAuthenticated, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [reports, setReports] = useState<Report[]>([]);
  const [dragActive, setDragActive] = useState(false);
  
  // Validation workflow states
  const [currentStep, setCurrentStep] = useState<'upload' | 'validation' | 'processing'>('upload');
  const [validationResults, setValidationResults] = useState<any>(null);
  const [validating, setValidating] = useState(false);
  const [filePath, setFilePath] = useState<string>('');
  const [targetColumn, setTargetColumn] = useState<string>('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/predictml/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    // Load existing reports from localStorage (in production, this would come from backend)
    const storedReports = localStorage.getItem('predictMLReports');
    if (storedReports) {
      setReports(JSON.parse(storedReports));
    }
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (selectedFile: File) => {
    // Validate file type
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    
    if (validTypes.includes(selectedFile.type) || selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls') || selectedFile.name.endsWith('.csv')) {
      setFile(selectedFile);
      setUploadStatus('');
    } else {
      setUploadStatus('Please select a valid Excel or CSV file');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const pollReportStatus = async (reportId: string, currentReports: Report[]) => {
    const maxAttempts = 60; // Poll for up to 5 minutes (60 * 5 seconds)
    let attempts = 0;

    const checkStatus = async () => {
      try {
        const token = localStorage.getItem('predictMLToken');
        const response = await fetch(`/api/predictml/status/${reportId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.status === 'ready') {
          // Report is ready!
          setUploadStatus('✅ Report generated successfully! Click download to get your report.');
          
          const updatedReports = currentReports.map(r =>
            r.id === reportId
              ? { ...r, status: 'ready' as const, downloadUrl: data.downloadUrl }
              : r
          );
          setReports(updatedReports);
          localStorage.setItem('predictMLReports', JSON.stringify(updatedReports));
          
        } else if (data.status === 'processing' && attempts < maxAttempts) {
          // Still processing, check again in 5 seconds
          attempts++;
          setUploadStatus(`Generating report... (${Math.round((attempts / maxAttempts) * 100)}%)`);
          setTimeout(checkStatus, 5000);
          
        } else {
          // Timed out or error
          setUploadStatus('⚠️ Report generation is taking longer than expected. Please check back later.');
          
          const updatedReports = currentReports.map(r =>
            r.id === reportId ? { ...r, status: 'pending' as const } : r
          );
          setReports(updatedReports);
          localStorage.setItem('predictMLReports', JSON.stringify(updatedReports));
        }
      } catch (error) {
        console.error('Error checking status:', error);
        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkStatus, 5000);
        }
      }
    };

    // Start polling
    setTimeout(checkStatus, 3000); // First check after 3 seconds
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file first');
      return;
    }

    setUploading(true);
    setUploadStatus('Uploading...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('predictMLToken');
      const response = await fetch('/api/predictml/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUploadStatus('Upload successful! Starting validation...');
        setFilePath(data.filePath);
        
        // Start validation instead of immediately generating report
        await handleValidation(data.filePath);
      } else {
        setUploadStatus(data.message || 'Upload failed. Please try again.');
        setUploading(false);
      }
    } catch (error) {
      setUploadStatus('Upload failed. Please check your connection and try again.');
      setUploading(false);
    }
  };

  const handleValidation = async (uploadedFilePath: string) => {
    setValidating(true);
    setUploadStatus('Validating data quality...');

    try {
      const token = localStorage.getItem('predictMLToken');
      const response = await fetch('/api/predictml/validate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filePath: uploadedFilePath,
          targetColumn: targetColumn || undefined
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setValidationResults(data.validationResults);
        setCurrentStep('validation');
        setUploadStatus('');
      } else {
        setUploadStatus(`Validation failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      setUploadStatus('Validation failed. Please try again.');
    } finally {
      setValidating(false);
      setUploading(false);
    }
  };

  const handleProceedWithReport = async () => {
    setCurrentStep('processing');
    setUploadStatus('Starting report generation...');

    try {
      const token = localStorage.getItem('predictMLToken');
      const reportId = Date.now().toString();

      // Call the generate-report API
      const response = await fetch('/api/predictml/generate-report', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filePath: filePath,
          reportId: reportId,
          options: {
            targetColumn: targetColumn || undefined,
            modelName: 'Data Analysis Report'
          }
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Create report entry
        const newReport: Report = {
          id: reportId,
          filename: file?.name || 'uploaded_file',
          uploadDate: new Date().toLocaleDateString(),
          status: 'processing',
        };

        const updatedReports = [newReport, ...reports];
        setReports(updatedReports);
        localStorage.setItem('predictMLReports', JSON.stringify(updatedReports));

        // Start polling for report status
        pollReportStatus(reportId, updatedReports);

        setUploadStatus('Report generation started successfully!');
      } else {
        setUploadStatus(`Failed to start report generation: ${data.message}`);
      }
    } catch (error) {
      setUploadStatus('Failed to start report generation. Please try again.');
    }

    // Reset states after a brief delay
    setTimeout(() => {
      setFile(null);
      setValidationResults(null);
      setCurrentStep('upload');
      setUploadStatus('');
    }, 3000);
  };

  const handleRejectFile = () => {
    // Reset to upload step
    setCurrentStep('upload');
    setValidationResults(null);
    setFile(null);
    setUploadStatus('');
    setFilePath('');
  };

  const handleDownload = async (report: Report) => {
    if (report.status === 'ready') {
      try {
        const token = localStorage.getItem('predictMLToken');
        const response = await fetch(`/api/predictml/download/${report.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // Create blob from response
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${report.filename.replace(/\.[^/.]+$/, '')}_report.docx`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        } else {
          alert('Error downloading report. Please try again.');
        }
      } catch (error) {
        console.error('Download error:', error);
        alert('Error downloading report. Please try again.');
      }
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-purple-900/20 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-purple-900/20">
      <ProductNav />
      
      {/* Header */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Welcome, {user?.name || user?.email}
              </h1>
              <p className="text-gray-400 mt-2">Upload your data and get AI-powered predictions</p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={logout}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {currentStep === 'upload' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/50 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Upload Your Data</h2>
              
              {/* Optional Target Column Input */}
              {file && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target Column (Optional)
                  </label>
                  <input
                    type="text"
                    value={targetColumn}
                    onChange={(e) => setTargetColumn(e.target.value)}
                    placeholder="e.g., 'churn', 'attrition', 'target' - leave empty for auto-detection"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Specify the column you want to predict. If left empty, we'll try to auto-detect it.
                  </p>
                </div>
              )}
              
              {/* Drag and Drop Area */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                  dragActive 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-gray-700 bg-gray-900/50'
                }`}
              >
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileInput}
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                />
                <label htmlFor="fileInput" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <svg className="w-16 h-16 text-purple-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-white text-lg mb-2">
                      {file ? file.name : 'Drag and drop your Excel file here'}
                    </p>
                    <p className="text-gray-400 text-sm mb-4">or click to browse</p>
                    <p className="text-gray-500 text-xs">Supports: .xlsx, .xls, .csv</p>
                  </div>
                </label>
              </div>

              {uploadStatus && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`mt-4 p-3 rounded-lg ${
                    uploadStatus.includes('successful') || uploadStatus.includes('complete')
                      ? 'bg-green-500/10 border border-green-500/20'
                      : uploadStatus.includes('failed')
                      ? 'bg-red-500/10 border border-red-500/20'
                      : 'bg-blue-500/10 border border-blue-500/20'
                  }`}
                >
                  <p className={`text-sm ${
                    uploadStatus.includes('successful') || uploadStatus.includes('complete')
                      ? 'text-green-400'
                      : uploadStatus.includes('failed')
                      ? 'text-red-400'
                      : 'text-blue-400'
                  }`}>
                    {uploadStatus}
                  </p>
                </motion.div>
              )}

              <button
                onClick={handleUpload}
                disabled={!file || uploading || validating}
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {uploading || validating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{validating ? 'Validating...' : 'Uploading...'}</span>
                  </div>
                ) : (
                  'Upload and Validate'
                )}
              </button>
            </motion.div>
          )}

          {/* Validation Results Section */}
          {currentStep === 'validation' && validationResults && (
            <ValidationResults
              validationResults={validationResults}
              fileName={file?.name || 'uploaded_file'}
              onProceed={handleProceedWithReport}
              onReject={handleRejectFile}
              isLoading={false}
            />
          )}
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/50 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Your Reports</h2>
            
            {reports.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-400">No reports yet. Upload your first file to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map((report) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">{report.filename}</h3>
                        <p className="text-gray-400 text-sm">Uploaded: {report.uploadDate}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                          report.status === 'ready'
                            ? 'bg-green-500/20 text-green-400'
                            : report.status === 'processing'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {report.status === 'ready' ? 'Ready' : report.status === 'processing' ? 'Processing' : 'Pending (24hrs)'}
                        </span>
                        {report.status === 'ready' ? (
                          <button
                            onClick={() => handleDownload(report)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Download
                          </button>
                        ) : report.status === 'pending' ? (
                          <div className="text-gray-400 text-sm">
                            ⏳ Model training in progress
                          </div>
                        ) : (
                          <div className="text-gray-400 text-sm">
                            ⚙️ Processing...
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-3">📊 How It Works</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Upload your Excel or CSV file with historical data</li>
              <li>• Our AI models analyze patterns and train on your data</li>
              <li>• Model training typically takes 24 hours for optimal accuracy</li>
              <li>• Download your prediction report once processing is complete</li>
              <li>• Reports include detailed insights and forecasts based on your data</li>
            </ul>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
