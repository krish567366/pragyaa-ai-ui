import { NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify admin access
    const token = authHeader.substring(7);
    const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
    if (!decodedToken.includes('admin@predictml.com')) {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { fileId, status } = body;

    if (!fileId || !status) {
      return NextResponse.json(
        { success: false, message: 'File ID and status are required' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['pending_review', 'approved', 'training', 'trained', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status' },
        { status: 400 }
      );
    }

    // Save status to a JSON file
    const uploadsDir = join(process.cwd(), 'uploads');
    const statusFile = join(uploadsDir, `${fileId}_status.json`);
    
    const statusData = {
      fileId: fileId,
      status: status,
      updatedAt: new Date().toISOString(),
      updatedBy: 'admin@predictml.com',
    };

    writeFileSync(statusFile, JSON.stringify(statusData, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully',
      status: status,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
