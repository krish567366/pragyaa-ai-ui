import { NextResponse } from 'next/server';
import { readdirSync, statSync, readFileSync } from 'fs';
import { join } from 'path';

export async function GET(request: Request) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // In production, verify the token and check if user is admin
    const token = authHeader.substring(7);
    // For demo, we'll check if the token contains admin email
    const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
    if (!decodedToken.includes('admin@predictml.com')) {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    // Read uploaded files from the uploads directory
    const uploadsDir = join(process.cwd(), 'uploads');
    const files: any[] = [];

    try {
      const entries = readdirSync(uploadsDir);
      
      for (const entry of entries) {
        const fullPath = join(uploadsDir, entry);
        const stats = statSync(fullPath);
        
        // Skip directories and .gitkeep
        if (stats.isDirectory() || entry === '.gitkeep') continue;
        
        // Only process Excel and CSV files
        if (entry.match(/\.(xlsx|xls|csv)$/i)) {
          // Extract report ID from filename (report_123_filename.xlsx)
          const match = entry.match(/^report_(\d+)_(.+)$/);
          const reportId = match ? match[1] : Date.now().toString();
          const originalFilename = match ? match[2] : entry;
          
          // Check if there's a corresponding status file
          let status = 'pending_review';
          let dataInfo = null;
          
          const statusFile = join(uploadsDir, `${reportId}_status.json`);
          try {
            const statusData = JSON.parse(readFileSync(statusFile, 'utf-8'));
            status = statusData.status || 'pending_review';
            dataInfo = statusData.dataInfo || null;
          } catch (e) {
            // No status file exists, use default
          }
          
          files.push({
            id: reportId,
            filename: originalFilename,
            filePath: fullPath,
            uploadDate: stats.mtime.toLocaleDateString() + ' ' + stats.mtime.toLocaleTimeString(),
            clientEmail: 'demo@predictml.com', // In production, get from database
            status: status,
            dataInfo: dataInfo,
            size: stats.size,
          });
        }
      }
      
      // Sort by upload date (most recent first)
      files.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
      
    } catch (error) {
      // Directory might not exist yet
      console.error('Error reading uploads directory:', error);
    }

    return NextResponse.json({
      success: true,
      files: files,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
