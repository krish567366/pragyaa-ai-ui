# Automated Model Training & Deployment Workflow

## Overview

The PredictML system now includes **automated model training** with admin review and approval for deployment. This document explains the complete workflow from data upload to model deployment.

---

## 🔄 Complete Workflow

### Phase 1: Automatic Training (User Upload)

```mermaid
User Uploads Data
    ↓
System Validates File
    ↓
Training Starts AUTOMATICALLY
    ↓
Status: "Training in Progress"
```

**What Happens:**
1. User uploads CSV/Excel file via `/predictml/dashboard`
2. File is saved to `/uploads/` directory
3. System **automatically triggers** training job
4. Training job runs in background (async)
5. User sees: "Model training in progress..."

**Training Steps (Simulated):**
- 10% - Initializing training environment
- 20% - Loading and preprocessing data
- 40% - Feature engineering and transformation
- 60% - Training machine learning model
- 80% - Validating model performance
- 95% - Generating model artifacts
- 100% - Training completed!

**Duration:** ~30 seconds (simulated) | In production: minutes to hours

---

### Phase 2: Admin Review (Pending Approval)

```mermaid
Training Completes
    ↓
Status: "Pending Admin Review"
    ↓
Admin Reviews Model
    ↓
Admin Decision: Approve or Reject
```

**What Happens:**
1. Training completes successfully
2. Status changes to: **"pending_review"**
3. Admin sees notification in `/predictml/admin` panel
4. Admin can:
   - View training logs
   - Review model metrics
   - Download dataset for inspection
   - **Approve for deployment** ✅
   - **Reject model** ❌

**User Sees:**
- "Your model is under admin review"
- "Please wait for approval before making predictions"

---

### Phase 3: Deployment Decision

#### Option A: Admin Approves → Deploy to Inference

```mermaid
Admin Approves
    ↓
Choose Deployment Target
    ├─ Local Deployment
    │   ↓
    │   Model deployed locally
    │   Endpoint: http://localhost:8000/predict/{id}
    │
    └─ Azure Deployment
        ↓
        Model deployed to Azure ML
        Endpoint: https://predictml.azureml.net/predict/{id}
```

**Deployment Options:**

1. **Local Deployment**
   - Model runs on local server
   - Fast for development/testing
   - Lower cost
   - Suitable for internal use

2. **Azure Deployment**
   - Model deployed to Azure ML
   - Production-ready endpoint
   - Auto-scaling
   - Enterprise features
   - Higher reliability

**User Sees:**
- "Model deployed successfully!"
- "You can now make predictions"
- Prediction interface becomes available
- Charts and visualizations are accessible

#### Option B: Admin Rejects

```mermaid
Admin Rejects
    ↓
Status: "Rejected"
    ↓
User notified
```

**User Sees:**
- "Model did not meet quality standards"
- "Please upload better quality data"
- Option to upload new dataset

---

## 📊 Status Flow Diagram

```
User Upload
    ↓
[training] ─────────────→ User: "Training in progress..."
    ↓                     Admin: Can view live progress
Training Complete
    ↓
[pending_review] ────────→ User: "Under admin review..."
    ↓                     Admin: Can approve/reject
Admin Approves
    ↓
[approved_for_inference] → User: "Model deploying..."
    ↓                     Admin: Can monitor deployment
Deployment Complete
    ↓
[deployed] ──────────────→ User: "Ready for predictions!"
                          Admin: Model is live
```

---

## 🎯 User Experience by Role

### 👤 Client User View (`/predictml/dashboard`)

| Stage | What User Sees | Actions Available |
|-------|---------------|-------------------|
| Upload | File upload form | Upload CSV/Excel |
| Training | "🔄 Training in progress... 45%" | View progress |
| Pending Review | "⏳ Under admin review" | Wait for approval |
| Deployed | "✅ Model ready!" | Make predictions, view charts |
| Rejected | "❌ Upload failed" | Upload new data |

### 👨‍💼 Admin View (`/predictml/admin`)

| Stage | What Admin Sees | Actions Available |
|-------|----------------|-------------------|
| Training | "🔄 Training: 45%" | Monitor progress |
| Pending Review | "⚠️ Needs Review" | Approve/Reject |
| Approved | "✅ Approved" | Choose deployment (Local/Azure) |
| Deployed | "🚀 Live on [target]" | Monitor, Undeploy |
| Rejected | "❌ Rejected" | View reason |

---

## 🔌 API Endpoints

### 1. Automatic Training Trigger
```
POST /api/predictml/auto-train
Authorization: Bearer {token}

Body:
{
  "datasetId": "report_1234567890",
  "filePath": "/uploads/report_1234567890_data.csv",
  "clientEmail": "demo@predictml.com",
  "filename": "data.csv"
}

Response:
{
  "success": true,
  "message": "Training started automatically",
  "trainingJobId": "training_1234567890",
  "status": "training"
}
```

### 2. Check Training Status
```
GET /api/predictml/training-status/{jobId}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "job": {
    "id": "training_1234567890",
    "datasetId": "report_1234567890",
    "status": "training",
    "progress": 45,
    "startTime": "2026-02-06T10:00:00Z",
    "logs": [
      {
        "timestamp": "2026-02-06T10:00:10Z",
        "message": "Loading and preprocessing data..."
      }
    ]
  }
}
```

### 3. Admin Approve/Reject Deployment
```
POST /api/predictml/admin/approve-deployment
Authorization: Bearer {token}

Body:
{
  "trainingJobId": "training_1234567890",
  "action": "approve",  // or "reject"
  "deploymentTarget": "azure"  // or "local"
}

Response:
{
  "success": true,
  "message": "Model approved and deployment to azure initiated",
  "status": "approved_for_inference",
  "deploymentTarget": "azure"
}
```

---

## 📁 Data Storage Structure

### Training Jobs Tracking
```
/uploads/training-jobs.json
[
  {
    "id": "training_1234567890",
    "datasetId": "report_1234567890",
    "filePath": "/uploads/report_1234567890_data.csv",
    "clientEmail": "demo@predictml.com",
    "filename": "data.csv",
    "status": "training",
    "progress": 45,
    "startTime": "2026-02-06T10:00:00Z",
    "logs": [...]
  }
]
```

### Dataset Metadata
```
/uploads/datasets-metadata.json
[
  {
    "id": "report_1234567890",
    "filename": "data.csv",
    "filePath": "/uploads/report_1234567890_data.csv",
    "clientEmail": "demo@predictml.com",
    "uploadDate": "2026-02-06T10:00:00Z",
    "fileSize": 1024000,
    "status": "deployed",
    "deploymentTarget": "azure"
  }
]
```

### Deployments Registry
```
/uploads/deployments.json
[
  {
    "trainingJobId": "training_1234567890",
    "datasetId": "report_1234567890",
    "target": "azure",
    "status": "active",
    "deployedAt": "2026-02-06T10:15:00Z",
    "endpoint": "https://predictml.azureml.net/predict/report_1234567890"
  }
]
```

---

## 🚀 Production Integration Guide

### For Local Deployment

Replace simulation in `/api/predictml/admin/approve-deployment/route.ts`:

```typescript
async function deployLocally(job: any) {
  // 1. Load trained model from storage
  const modelPath = `./models/${job.datasetId}/model.pkl`;
  
  // 2. Start Flask/FastAPI inference server
  const inferenceServer = spawn('python', [
    'inference_server.py',
    '--model-path', modelPath,
    '--port', '8000'
  ]);
  
  // 3. Wait for server to be ready
  await waitForServer('http://localhost:8000/health');
  
  // 4. Register in model registry
  await registerModel(job.datasetId, 'local', 'http://localhost:8000');
}
```

### For Azure Deployment

```typescript
async function deployToAzure(job: any) {
  // 1. Upload model to Azure Blob Storage
  const blobClient = new BlobServiceClient(connectionString);
  await blobClient.uploadModel(`${job.datasetId}/model.pkl`);
  
  // 2. Create Azure ML Deployment
  const mlClient = new AzureMLClient(credentials);
  const deployment = await mlClient.createDeployment({
    modelId: job.datasetId,
    instanceType: 'Standard_DS2_v2',
    instanceCount: 1
  });
  
  // 3. Wait for deployment
  await deployment.wait();
  
  // 4. Get endpoint URL
  const endpointUrl = deployment.scoringUri;
  
  // 5. Register in model registry
  await registerModel(job.datasetId, 'azure', endpointUrl);
}
```

---

## 🎓 Key Benefits

### For Users
✅ **Zero Configuration** - Just upload and wait
✅ **Automatic Training** - No manual triggers needed
✅ **Progress Tracking** - See training progress in real-time
✅ **Quality Assurance** - Admin review ensures model quality
✅ **Ready-to-Use** - Predictions available immediately after approval

### For Admins/Engineers
✅ **Quality Control** - Review before deployment
✅ **Flexible Deployment** - Choose local or cloud
✅ **Full Visibility** - Training logs and metrics
✅ **Risk Management** - Reject poor quality models
✅ **Deployment Control** - Manage where models run

### For Organization
✅ **Automated Pipeline** - Reduces manual work
✅ **Governed Process** - Human-in-the-loop approval
✅ **Scalable** - Can handle multiple concurrent trainings
✅ **Cost Control** - Choose deployment target based on needs
✅ **Audit Trail** - Complete history of all actions

---

## 🔧 Configuration Options

### Training Parameters (Future Enhancement)
```typescript
// In /api/predictml/auto-train/route.ts
const trainingConfig = {
  maxTrainingTime: 3600, // 1 hour
  validationSplit: 0.2,
  earlyStoppingPatience: 10,
  modelType: 'auto', // or 'xgboost', 'neural_network', etc.
};
```

### Deployment Options
```typescript
const deploymentConfig = {
  local: {
    port: 8000,
    workers: 4,
    timeout: 60
  },
  azure: {
    region: 'eastus',
    instanceType: 'Standard_DS2_v2',
    minInstances: 1,
    maxInstances: 10
  }
};
```

---

## 🧪 Testing the Workflow

### End-to-End Test:

1. **Upload as User**
   ```bash
   Login: demo@predictml.com / demo123
   Go to: /predictml/dashboard
   Upload: your_data.csv
   ```

2. **Monitor Training**
   ```bash
   Watch progress bar: "Training in progress... 45%"
   Wait ~30 seconds for completion
   ```

3. **Review as Admin**
   ```bash
   Login: admin@predictml.com / admin123
   Go to: /predictml/admin
   See: "Pending Review" status
   Click: "Review" button
   ```

4. **Approve Deployment**
   ```bash
   Choose: "Local" or "Azure"
   Click: "Approve for Deployment"
   Wait for deployment confirmation
   ```

5. **Use Model (as User)**
   ```bash
   Return to: /predictml/dashboard
   Status: "Ready for Predictions"
   Make predictions, view charts
   ```

---

## 📚 Related Documentation

- [ADMIN-VS-USER-DASHBOARD.md](./ADMIN-VS-USER-DASHBOARD.md) - Dashboard differences
- [QUICKSTART-PREDICTML.md](./QUICKSTART-PREDICTML.md) - Getting started guide
- [PREDICTML-AUTH-IMPLEMENTATION.md](./PREDICTML-AUTH-IMPLEMENTATION.md) - Authentication setup

---

## ✅ Implementation Checklist

- [x] Auto-training API endpoint
- [x] Training status tracking
- [x] Admin approval endpoint
- [x] Local deployment simulation
- [x] Azure deployment simulation
- [x] User dashboard integration
- [x] Admin dashboard integration
- [x] Progress tracking
- [x] Status synchronization
- [ ] Production ML training integration
- [ ] Real Azure ML deployment
- [ ] Prediction API endpoint
- [ ] Chart generation for predictions
- [ ] Email notifications
- [ ] Model monitoring dashboard

---

**Last Updated:** February 6, 2026
**Version:** 1.0.0
