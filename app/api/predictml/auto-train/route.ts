import { NextResponse } from 'next/server';
import { join } from 'path';
import { writeFileSync, readFileSync, existsSync } from 'fs';

// This endpoint is called automatically after file upload
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
    const { datasetId, filePath, clientEmail, filename, targetColumn } = body;

    if (!datasetId || !filePath) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create training job entry
    const trainingJob = {
      id: `training_${Date.now()}`,
      datasetId,
      filePath,
      clientEmail,
      filename,
      targetColumn: targetColumn || 'target',
      status: 'training',
      startTime: new Date().toISOString(),
      progress: 0,
      logs: []
    };

    // Save training job to tracking file
    const trainingJobsPath = join(process.cwd(), 'uploads', 'training-jobs.json');
    let trainingJobs = [];
    
    if (existsSync(trainingJobsPath)) {
      const data = readFileSync(trainingJobsPath, 'utf-8');
      trainingJobs = JSON.parse(data);
    }
    
    trainingJobs.push(trainingJob);
    writeFileSync(trainingJobsPath, JSON.stringify(trainingJobs, null, 2));

    // Start async training process (non-blocking)
    startTrainingProcess(trainingJob);

    return NextResponse.json({
      success: true,
      message: 'Training started automatically',
      trainingJobId: trainingJob.id,
      status: 'training'
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to start training', error: String(error) },
      { status: 500 }
    );
  }
}

// Async training process (runs in background)
async function startTrainingProcess(trainingJob: any) {
  try {
    // Update status to training
    updateTrainingJobStatus(trainingJob.id, 'training', 10, 'Initializing training environment...');

    // Run real AutoML training
    await runAutoMLTraining(trainingJob);

    // After training completes, update status to pending_review
    updateTrainingJobStatus(
      trainingJob.id, 
      'pending_review', 
      100, 
      'Training completed successfully. Awaiting admin approval for deployment.'
    );

    // Update the dataset status in metadata
    updateDatasetMetadata(trainingJob.datasetId, 'pending_review');

  } catch (error) {
    updateTrainingJobStatus(
      trainingJob.id, 
      'failed', 
      0, 
      `Training failed: ${error}`
    );
    updateDatasetMetadata(trainingJob.datasetId, 'training_failed');
  }
}

// Run AutoML training using Python script
async function runAutoMLTraining(trainingJob: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const spawn = require('child_process').spawn;
    const path = require('path');
    
    const scriptPath = path.join(process.cwd(), 'scripts', 'automl_trainer.py');
    const modelsDir = path.join(process.cwd(), 'models');
    
    // Get Python executable path
    const pythonPath = process.env.PYTHON_PATH || 'python3';
    
    // Determine target column (use from validation results or default)
    const targetColumn = trainingJob.targetColumn || 'target';
    
    updateTrainingJobStatus(trainingJob.id, 'training', 15, 'Starting Python AutoML training...');
    
    // Spawn Python process
    const python = spawn(pythonPath, [
      scriptPath,
      trainingJob.filePath,
      targetColumn,
      'auto',  // auto-detect problem type
      modelsDir
    ]);
    
    let stdout = '';
    let stderr = '';
    
    python.stdout.on('data', (data: Buffer) => {
      stdout += data.toString();
    });
    
    python.stderr.on('data', (data: Buffer) => {
      const output = data.toString();
      stderr += output;
      
      // Parse progress updates from stderr
      try {
        const lines = output.split('\n');
        for (const line of lines) {
          if (line.trim() && line.includes('"type":"progress"')) {
            const progressData = JSON.parse(line);
            updateTrainingJobStatus(
              trainingJob.id,
              'training',
              progressData.progress || 50,
              progressData.message
            );
          }
        }
      } catch (e) {
        // Not JSON, just log it
        updateTrainingJobStatus(trainingJob.id, 'training', 50, output.trim());
      }
    });
    
    python.on('close', (code: number) => {
      if (code === 0) {
        try {
          const result = JSON.parse(stdout);
          
          if (result.success) {
            // Save model metadata
            trainingJob.modelPath = result.model_path;
            trainingJob.modelName = result.model_name;
            trainingJob.problemType = result.problem_type;
            trainingJob.metrics = result.metrics;
            trainingJob.featureCount = result.feature_count;
            trainingJob.trainingSamples = result.training_samples;
            
            updateTrainingJobMetadata(trainingJob);
            
            resolve();
          } else {
            reject(new Error(result.error || 'Training failed'));
          }
        } catch (parseError) {
          reject(new Error(`Failed to parse training results: ${parseError}`));
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

function updateTrainingJobStatus(jobId: string, status: string, progress: number, message: string) {
  try {
    const trainingJobsPath = join(process.cwd(), 'uploads', 'training-jobs.json');
    
    if (existsSync(trainingJobsPath)) {
      const data = readFileSync(trainingJobsPath, 'utf-8');
      const trainingJobs = JSON.parse(data);
      
      const jobIndex = trainingJobs.findIndex((job: any) => job.id === jobId);
      if (jobIndex !== -1) {
        trainingJobs[jobIndex].status = status;
        trainingJobs[jobIndex].progress = progress;
        trainingJobs[jobIndex].lastUpdate = new Date().toISOString();
        trainingJobs[jobIndex].logs.push({
          timestamp: new Date().toISOString(),
          message
        });
        
        if (status === 'pending_review' || status === 'failed') {
          trainingJobs[jobIndex].endTime = new Date().toISOString();
        }
        
        writeFileSync(trainingJobsPath, JSON.stringify(trainingJobs, null, 2));
      }
    }
  } catch (error) {
    console.error('Failed to update training job status:', error);
  }
}

function updateDatasetMetadata(datasetId: string, status: string) {
  try {
    const metadataPath = join(process.cwd(), 'uploads', 'datasets-metadata.json');
    
    if (existsSync(metadataPath)) {
      const data = readFileSync(metadataPath, 'utf-8');
      const datasets = JSON.parse(data);
      
      const datasetIndex = datasets.findIndex((ds: any) => ds.id === datasetId);
      if (datasetIndex !== -1) {
        datasets[datasetIndex].status = status;
        datasets[datasetIndex].lastUpdate = new Date().toISOString();
        writeFileSync(metadataPath, JSON.stringify(datasets, null, 2));
      }
    }
  } catch (error) {
    console.error('Failed to update dataset metadata:', error);
  }
}

function updateTrainingJobMetadata(trainingJob: any) {
  try {
    const trainingJobsPath = join(process.cwd(), 'uploads', 'training-jobs.json');
    
    if (existsSync(trainingJobsPath)) {
      const data = readFileSync(trainingJobsPath, 'utf-8');
      const trainingJobs = JSON.parse(data);
      
      const jobIndex = trainingJobs.findIndex((job: any) => job.id === trainingJob.id);
      if (jobIndex !== -1) {
        // Update job with model metadata
        trainingJobs[jobIndex] = {
          ...trainingJobs[jobIndex],
          ...trainingJob
        };
        writeFileSync(trainingJobsPath, JSON.stringify(trainingJobs, null, 2));
      }
    }
  } catch (error) {
    console.error('Failed to update training job metadata:', error);
  }
}
