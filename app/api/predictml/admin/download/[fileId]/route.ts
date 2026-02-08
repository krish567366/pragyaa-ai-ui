import { NextResponse } from 'next/server';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

export async function GET(
  _request: Request,
  { params }: { params: { fileId: string } }
) {
  try {
    const fileId = params.fileId;
    const uploadsDir = join(process.cwd(), 'uploads');
    
    // Find the file with this ID
    const files = readdirSync(uploadsDir);
    const targetFile = files.find(f => f.startsWith(`report_${fileId}_`));
    
    if (!targetFile) {
      return NextResponse.json(
        { success: false, message: 'File not found' },
        { status: 404 }
      );
    }

    const filePath = join(uploadsDir, targetFile);
    const fileBuffer = readFileSync(filePath);
    
    // Determine content type based on extension
    let contentType = 'application/octet-stream';
    if (targetFile.endsWith('.xlsx')) {
      contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else if (targetFile.endsWith('.xls')) {
      contentType = 'application/vnd.ms-excel';
    } else if (targetFile.endsWith('.csv')) {
      contentType = 'text/csv';
    }

    // Extract original filename (remove report_ID_ prefix)
    const originalFilename = targetFile.replace(/^report_\d+_/, '');

    return new NextResponse(fileBuffer as any, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${originalFilename}"`,
      },
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Download error' },
      { status: 500 }
    );
  }
}
