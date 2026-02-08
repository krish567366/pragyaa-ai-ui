import { NextResponse } from 'next/server';
import { join } from 'path';
import { readFileSync, existsSync } from 'fs';

export async function GET(
  request: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { jobId } = params;
    const trainingJobsPath = join(process.cwd(), 'uploads', 'training-jobs.json');

    if (!existsSync(trainingJobsPath)) {
      return NextResponse.json(
        { success: false, message: 'No training jobs found' },
        { status: 404 }
      );
    }

    const data = readFileSync(trainingJobsPath, 'utf-8');
    const trainingJobs = JSON.parse(data);
    
    const job = trainingJobs.find((j: any) => j.id === jobId);

    if (!job) {
      return NextResponse.json(
        { success: false, message: 'Training job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      job: {
        id: job.id,
        datasetId: job.datasetId,
        status: job.status,
        progress: job.progress,
        startTime: job.startTime,
        endTime: job.endTime,
        lastUpdate: job.lastUpdate,
        logs: job.logs
      }
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to get training status', error: String(error) },
      { status: 500 }
    );
  }
}
