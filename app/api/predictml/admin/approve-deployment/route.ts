import { NextResponse } from 'next/server';
import { join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';

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
    const { trainingJobId, action, deploymentTarget } = body;
    
    // action: 'approve' or 'reject'
    // deploymentTarget: 'local' or 'azure'

    if (!trainingJobId || !action) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const trainingJobsPath = join(process.cwd(), 'uploads', 'training-jobs.json');
    
    if (!existsSync(trainingJobsPath)) {
      return NextResponse.json(
        { success: false, message: 'No training jobs found' },
        { status: 404 }
      );
    }

    const data = readFileSync(trainingJobsPath, 'utf-8');
    const trainingJobs = JSON.parse(data);
    
    const jobIndex = trainingJobs.findIndex((j: any) => j.id === trainingJobId);

    if (jobIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Training job not found' },
        { status: 404 }
      );
    }

    const job = trainingJobs[jobIndex];

    if (action === 'approve') {
      // Update training job status
      trainingJobs[jobIndex].status = 'approved_for_inference';
      trainingJobs[jobIndex].deploymentTarget = deploymentTarget || 'local';
      trainingJobs[jobIndex].approvedAt = new Date().toISOString();
      trainingJobs[jobIndex].logs.push({
        timestamp: new Date().toISOString(),
        message: `Model approved for deployment to ${deploymentTarget || 'local'}`
      });

      // Update dataset metadata
      updateDatasetMetadata(job.datasetId, 'deployed', deploymentTarget);

      // Trigger deployment process
      if (deploymentTarget === 'azure') {
        await deployToAzure(job);
      } else {
        await deployLocally(job);
      }

      writeFileSync(trainingJobsPath, JSON.stringify(trainingJobs, null, 2));

      return NextResponse.json({
        success: true,
        message: `Model approved and deployment to ${deploymentTarget || 'local'} initiated`,
        status: 'approved_for_inference',
        deploymentTarget: deploymentTarget || 'local'
      });

    } else if (action === 'reject') {
      // Update training job status
      trainingJobs[jobIndex].status = 'rejected';
      trainingJobs[jobIndex].rejectedAt = new Date().toISOString();
      trainingJobs[jobIndex].logs.push({
        timestamp: new Date().toISOString(),
        message: 'Model rejected by admin - not suitable for deployment'
      });

      // Update dataset metadata
      updateDatasetMetadata(job.datasetId, 'rejected');

      writeFileSync(trainingJobsPath, JSON.stringify(trainingJobs, null, 2));

      return NextResponse.json({
        success: true,
        message: 'Model rejected',
        status: 'rejected'
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to process approval', error: String(error) },
      { status: 500 }
    );
  }
}

function updateDatasetMetadata(datasetId: string, status: string, deploymentTarget?: string) {
  try {
    const metadataPath = join(process.cwd(), 'uploads', 'datasets-metadata.json');
    
    if (existsSync(metadataPath)) {
      const data = readFileSync(metadataPath, 'utf-8');
      const datasets = JSON.parse(data);
      
      const datasetIndex = datasets.findIndex((ds: any) => ds.id === datasetId);
      if (datasetIndex !== -1) {
        datasets[datasetIndex].status = status;
        datasets[datasetIndex].lastUpdate = new Date().toISOString();
        if (deploymentTarget) {
          datasets[datasetIndex].deploymentTarget = deploymentTarget;
        }
        writeFileSync(metadataPath, JSON.stringify(datasets, null, 2));
      }
    }
  } catch (error) {
    console.error('Failed to update dataset metadata:', error);
  }
}

async function deployLocally(job: any) {
  // Simulate local deployment
  // In production, this would:
  // 1. Load the trained model
  // 2. Start a local inference server
  // 3. Update model registry
  console.log(`Deploying model ${job.id} locally...`);
  
  // Create deployment record
  const deploymentsPath = join(process.cwd(), 'uploads', 'deployments.json');
  let deployments = [];
  
  if (existsSync(deploymentsPath)) {
    const data = readFileSync(deploymentsPath, 'utf-8');
    deployments = JSON.parse(data);
  }
  
  deployments.push({
    trainingJobId: job.id,
    datasetId: job.datasetId,
    target: 'local',
    status: 'active',
    deployedAt: new Date().toISOString(),
    endpoint: `http://localhost:8000/predict/${job.datasetId}`
  });
  
  writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2));
}

async function deployToAzure(job: any) {
  // Simulate Azure deployment
  // In production, this would:
  // 1. Upload model to Azure Blob Storage
  // 2. Deploy to Azure ML endpoint
  // 3. Configure scaling and monitoring
  console.log(`Deploying model ${job.id} to Azure...`);
  
  // Create deployment record
  const deploymentsPath = join(process.cwd(), 'uploads', 'deployments.json');
  let deployments = [];
  
  if (existsSync(deploymentsPath)) {
    const data = readFileSync(deploymentsPath, 'utf-8');
    deployments = JSON.parse(data);
  }
  
  deployments.push({
    trainingJobId: job.id,
    datasetId: job.datasetId,
    target: 'azure',
    status: 'active',
    deployedAt: new Date().toISOString(),
    endpoint: `https://predictml.azureml.net/predict/${job.datasetId}`
  });
  
  writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2));
}
