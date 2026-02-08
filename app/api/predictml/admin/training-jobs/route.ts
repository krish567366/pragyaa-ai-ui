import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
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

    // Verify admin role
    const token = authHeader.substring(7);
    const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
    if (!decodedToken.includes('admin@predictml.com')) {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    // Read training jobs
    const trainingJobsPath = join(process.cwd(), 'uploads', 'training-jobs.json');
    let trainingJobs = [];

    if (existsSync(trainingJobsPath)) {
      const data = readFileSync(trainingJobsPath, 'utf-8');
      trainingJobs = JSON.parse(data);
    }

    // Filter jobs that need review (pending_review status)
    const pendingJobs = trainingJobs.filter((job: any) => job.status === 'pending_review');
    const approvedJobs = trainingJobs.filter((job: any) => 
      job.status === 'approved_for_inference' || job.status === 'deployed'
    );
    const rejectedJobs = trainingJobs.filter((job: any) => job.status === 'rejected');
    const trainingInProgress = trainingJobs.filter((job: any) => job.status === 'training');
    const failedJobs = trainingJobs.filter((job: any) => job.status === 'failed');

    return NextResponse.json({
      success: true,
      summary: {
        total: trainingJobs.length,
        pendingReview: pendingJobs.length,
        approved: approvedJobs.length,
        rejected: rejectedJobs.length,
        training: trainingInProgress.length,
        failed: failedJobs.length
      },
      jobs: {
        pendingReview: pendingJobs,
        approved: approvedJobs,
        rejected: rejectedJobs,
        training: trainingInProgress,
        failed: failedJobs
      },
      allJobs: trainingJobs.sort((a: any, b: any) => 
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
      )
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error', error: String(error) },
      { status: 500 }
    );
  }
}
