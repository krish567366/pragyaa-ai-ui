import { NextResponse } from 'next/server';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Helper function to extract email from token (simple decode for demo)
function extractEmailFromToken(token: string): string {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const email = decoded.split(':')[0];
    return email || 'unknown@email.com';
  } catch {
    return 'unknown@email.com';
  }
}

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
    const targetColumn = formData.get('targetColumn') as string || 'target';

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

    // Extract user email from token for tracking
    const token = authHeader.split(' ')[1] || '';
    const userEmail = extractEmailFromToken(token);

    // Save dataset metadata
    const datasetMetadata = {
      id: reportId,
      filename: file.name,
      filePath: filePath,
      clientEmail: userEmail,
      uploadDate: new Date().toISOString(),
      fileSize: file.size,
      status: 'training', // Automatically starts training
    };

    // Save metadata to file
    const metadataPath = join(process.cwd(), 'uploads', 'datasets-metadata.json');
    let datasets = [];
    if (existsSync(metadataPath)) {
      const data = await readFile(metadataPath, 'utf-8');
      datasets = JSON.parse(data);
    }
    datasets.push(datasetMetadata);
    await writeFile(metadataPath, JSON.stringify(datasets, null, 2));

    // Automatically trigger training
    try {
      const trainingResponse = await fetch(`${request.url.split('/upload')[0]}/auto-train`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          datasetId: reportId,
          filePath: filePath,
          clientEmail: userEmail,
          filename: file.name,
          targetColumn: targetColumn
        })
      });

      const trainingData = await trainingResponse.json();
      
      return NextResponse.json({
        success: true,
        message: 'File uploaded successfully. Model training started automatically.',
        reportId,
        filename: file.name,
        size: file.size,
        uploadDate: new Date().toISOString(),
        filePath: filePath,
        trainingJobId: trainingData.trainingJobId,
        status: 'training'
      });
    } catch (trainingError) {
      // Even if training fails to start, file is uploaded
      return NextResponse.json({
        success: true,
        message: 'File uploaded successfully. Training will be initiated shortly.',
        reportId,
        filename: file.name,
        size: file.size,
        uploadDate: new Date().toISOString(),
        filePath: filePath,
        status: 'pending'
      });
    }

  } catch (error) {

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
