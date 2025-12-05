import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: Request) {
  try {
    // Verify authentication token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    
    const isValidType = validTypes.includes(file.type) || 
                       file.name.endsWith('.xlsx') || 
                       file.name.endsWith('.xls') || 
                       file.name.endsWith('.csv');

    if (!isValidType) {
      return NextResponse.json(
        { success: false, message: 'Invalid file type. Please upload Excel or CSV files only.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Save file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const reportId = `report_${Date.now()}`;
    const fileName = `${reportId}_${file.name}`;
    const filePath = join(uploadsDir, fileName);
    
    await writeFile(filePath, new Uint8Array(buffer));
    console.log('File saved to:', filePath);

    // Automatically trigger report generation
    try {
      const { spawn } = await import('child_process');
      const scriptPath = join(process.cwd(), 'scripts', 'generate_report.py');
      
      // Prepare options for Python script
      // You can customize these based on the file or user input
      const scriptOptions = {
        target_column: 'target', // Default - should be configurable
        model_name: 'Data Analysis Report',
        positive_class: null // Auto-detect
      };

      // Start Python process
      const python = spawn('python3', [
        scriptPath,
        filePath,
        reportId,
        JSON.stringify(scriptOptions)
      ]);

      python.stdout.on('data', (data) => {
        console.log('Python output:', data.toString());
      });

      python.stderr.on('data', (data) => {
        console.error('Python error:', data.toString());
      });

      python.on('close', (code) => {
        console.log(`Report generation completed with code ${code}`);
      });

      // Don't wait for Python to complete - return immediately
      // The report will be generated in the background

    } catch (error) {
      console.error('Error triggering report generation:', error);
      // Continue anyway - file is uploaded
    }

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully. Report generation started.',
      reportId,
      filename: file.name,
      size: file.size,
      uploadDate: new Date().toISOString(),
      filePath: filePath,
      downloadUrl: `/api/predictml/download/${reportId}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error during upload. Please try again.' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
