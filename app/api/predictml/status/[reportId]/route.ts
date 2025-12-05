import { NextResponse } from 'next/server';
import { existsSync } from 'fs';
import { join } from 'path';

export async function GET(
  request: Request,
  { params }: { params: { reportId: string } }
) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { reportId } = params;

    // Check if report file exists
    const reportsDir = join(process.cwd(), 'uploads', 'reports');
    const reportPath = join(reportsDir, `${reportId}_report.docx`);

    const exists = existsSync(reportPath);

    if (exists) {
      return NextResponse.json({
        success: true,
        status: 'ready',
        reportId,
        downloadUrl: `/api/predictml/download/${reportId}`,
        message: 'Report is ready for download'
      });
    } else {
      // Check if original file exists (still processing)
      const uploadsDir = join(process.cwd(), 'uploads');
      const originalFiles = existsSync(uploadsDir);
      
      if (originalFiles) {
        return NextResponse.json({
          success: true,
          status: 'processing',
          reportId,
          message: 'Report is being generated. Please check back in a moment.'
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 'not_found',
          message: 'Report not found'
        }, { status: 404 });
      }
    }
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { success: false, message: 'Error checking report status' },
      { status: 500 }
    );
  }
}
