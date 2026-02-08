import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { join } from 'path';
import { readFileSync, existsSync } from 'fs';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { datasetId, inputData } = body;

    if (!datasetId || !inputData) {
      return NextResponse.json(
        { success: false, message: 'Missing datasetId or inputData' },
        { status: 400 }
      );
    }

    // Get deployment information
    const deploymentsPath = join(process.cwd(), 'uploads', 'deployments.json');
    
    if (!existsSync(deploymentsPath)) {
      return NextResponse.json(
        { success: false, message: 'No deployments found' },
        { status: 404 }
      );
    }

    const deployments = JSON.parse(readFileSync(deploymentsPath, 'utf-8'));
    const deployment = deployments.find((d: any) => d.datasetId === datasetId && d.status === 'active');

    if (!deployment) {
      return NextResponse.json(
        { success: false, message: 'Model not deployed or inactive' },
        { status: 404 }
      );
    }

    // Get model path from training job
    const trainingJobsPath = join(process.cwd(), 'uploads', 'training-jobs.json');
    const trainingJobs = JSON.parse(readFileSync(trainingJobsPath, 'utf-8'));
    const trainingJob = trainingJobs.find((j: any) => j.datasetId === datasetId);

    if (!trainingJob || !trainingJob.modelPath) {
      return NextResponse.json(
        { success: false, message: 'Model file not found' },
        { status: 404 }
      );
    }

    // Make prediction using Python script
    const prediction = await makePrediction(trainingJob.modelPath, inputData);

    return NextResponse.json({
      success: true,
      datasetId,
      modelName: trainingJob.modelName,
      problemType: trainingJob.problemType,
      ...prediction
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Prediction failed', error: String(error) },
      { status: 500 }
    );
  }
}

async function makePrediction(modelPath: string, inputData: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const scriptPath = join(process.cwd(), 'scripts', 'model_inference.py');
    const pythonPath = process.env.PYTHON_PATH || 'python3';
    
    const python = spawn(pythonPath, [
      scriptPath,
      modelPath,
      JSON.stringify(inputData)
    ]);
    
    let stdout = '';
    let stderr = '';
    
    python.stdout.on('data', (data: Buffer) => {
      stdout += data.toString();
    });
    
    python.stderr.on('data', (data: Buffer) => {
      stderr += data.toString();
    });
    
    python.on('close', (code: number) => {
      if (code === 0) {
        try {
          const result = JSON.parse(stdout);
          if (result.success) {
            resolve(result);
          } else {
            reject(new Error(result.error || 'Prediction failed'));
          }
        } catch (parseError) {
          reject(new Error(`Failed to parse prediction results: ${parseError}`));
        }
      } else {
        reject(new Error(`Python script exited with code ${code}: ${stderr}`));
      }
    });
    
    python.on('error', (error: Error) => {
      reject(new Error(`Failed to start Python process: ${error.message}`));
    });
  });
}
