# 🚀 Quick Start: Automated Model Training

## Test the Complete Workflow in 5 Minutes

### Prerequisites
```bash
npm run dev
# Server running at http://localhost:3000
```

---

## 🎯 Scenario: Upload Data → Auto-Train → Admin Approve → Deploy

### Step 1: Upload as Client (1 minute)

```bash
1. Open: http://localhost:3000/predictml/login
2. Login: demo@predictml.com / demo123
3. Go to: Dashboard (automatic redirect)
4. Upload: Any CSV or Excel file
5. Watch: "🔄 Training in progress... XX%"
```

**What you'll see:**
- Upload progress bar
- "Training started automatically" message
- Live progress: 10% → 20% → 40% → 60% → 80% → 100%
- Status updates every 5 seconds

**Wait time:** ~30 seconds for training to complete

---

### Step 2: Review as Admin (1 minute)

```bash
1. Logout from user dashboard
2. Go to: http://localhost:3000/predictml/login
3. Login: admin@predictml.com / admin123
4. Go to: Admin Panel (automatic redirect)
5. See: Your dataset with "⚠️ Pending Review" status
6. Click: "Review" button on the dataset
```

**What you'll see:**
- List of all uploaded datasets
- Training status and progress
- Client email who uploaded
- File details (size, upload date)
- Review modal with full details

---

### Step 3: Approve & Deploy (1 minute)

```bash
In the Review Modal:
1. Review: Training logs and dataset info
2. Choose: Deployment target
   - Click "Local Deployment" for testing
   - Or "Azure Deployment" for production
3. Click: "Approve for Deployment"
4. Wait: Deployment confirmation
```

**Deployment Options:**

**Local Deployment:**
- Endpoint: `http://localhost:8000/predict/{datasetId}`
- Best for: Development, testing, demos
- Cost: Free
- Speed: Instant

**Azure Deployment:**
- Endpoint: `https://predictml.azureml.net/predict/{datasetId}`
- Best for: Production, enterprise use
- Cost: Pay-as-you-go
- Speed: ~2-3 minutes

---

### Step 4: Use Model (1 minute)

```bash
1. Logout from admin panel
2. Login: demo@predictml.com / demo123
3. Go to: Dashboard
4. See: Your dataset with "✅ Ready" status
5. Click: "Make Predictions" or "View Charts"
```

**What's Available:**
- Prediction interface
- Interactive charts and visualizations
- Model performance metrics
- Download reports

---

## 📊 Status Tracking

### User Dashboard View

| Status | Icon | Meaning | Action |
|--------|------|---------|--------|
| Training | 🔄 XX% | Model training in progress | Wait |
| Under Review | ⏳ | Admin is reviewing | Wait for approval |
| Ready | ✅ | Model deployed | Make predictions! |
| Failed | ❌ | Training or approval failed | Re-upload data |

### Admin Panel View

| Status | Icon | Meaning | Action |
|--------|------|---------|--------|
| Training | 🔄 XX% | Training in progress | Monitor |
| Pending Review | ⚠️ | Needs approval | Review & Approve/Reject |
| Approved | ✅ | Approved for deployment | Monitor deployment |
| Deployed | 🚀 | Live and active | Monitor performance |
| Rejected | ❌ | Not suitable | Review reason |

---

## 🔍 Detailed Testing Guide

### Test 1: Happy Path (Everything Works)
```
Upload → Training (30s) → Review → Approve → Deploy → Predict
Expected: ✅ All steps complete successfully
```

### Test 2: Admin Rejection
```
Upload → Training (30s) → Review → Reject
Expected: ❌ User sees "Upload failed" message
```

### Test 3: Multiple Uploads
```
User 1 uploads File A
User 2 uploads File B (same time)
Admin sees: Both files in queue
Expected: ✅ Both train independently
```

### Test 4: Different Deployment Targets
```
File A → Approve → Local Deployment
File B → Approve → Azure Deployment
Expected: ✅ Both deployed to different endpoints
```

---

## 🐛 Troubleshooting

### Issue: "Training stuck at XX%"
**Solution:** Refresh the page - status updates every 5 seconds

### Issue: "Can't see uploaded file in admin panel"
**Solution:** Check if logged in as admin@predictml.com

### Issue: "Deployment fails"
**Solution:** Check console logs - simulated deployment should always succeed

### Issue: "Can't make predictions"
**Solution:** Wait for status to be "✅ Ready" - deployment takes a moment

---

## 📝 API Testing (Optional)

### Test Auto-Train Endpoint
```bash
curl -X POST http://localhost:3000/api/predictml/auto-train \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "datasetId": "report_123",
    "filePath": "/uploads/report_123_data.csv",
    "clientEmail": "demo@predictml.com",
    "filename": "data.csv"
  }'
```

### Check Training Status
```bash
curl http://localhost:3000/api/predictml/training-status/training_123 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Approve Deployment
```bash
curl -X POST http://localhost:3000/api/predictml/admin/approve-deployment \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "trainingJobId": "training_123",
    "action": "approve",
    "deploymentTarget": "local"
  }'
```

---

## ✅ Success Checklist

After completing the test, you should have:
- [ ] Uploaded a file as user
- [ ] Seen training progress (0% → 100%)
- [ ] Reviewed the model as admin
- [ ] Approved for deployment
- [ ] Chosen deployment target (Local or Azure)
- [ ] Seen "Ready" status as user
- [ ] Accessed predictions/charts

---

## 🎓 What's Happening Behind the Scenes

### Upload Flow:
```
1. File saved to /uploads/
2. Metadata saved to datasets-metadata.json
3. POST /api/predictml/auto-train triggered
4. Training job created in training-jobs.json
5. Background process simulates training
6. Progress updated every 5 seconds
7. Status changes to "pending_review" when done
```

### Approval Flow:
```
1. Admin reviews in /predictml/admin
2. POST /api/predictml/admin/approve-deployment
3. Deployment target chosen (local/azure)
4. Deployment record created in deployments.json
5. Model "deployed" (simulated)
6. User dashboard shows "Ready" status
```

---

## 🚀 Next: Production Integration

Once you've tested the workflow, integrate real ML:

### Replace Training Simulation
```typescript
// In /api/predictml/auto-train/route.ts
import { trainModel } from './ml-pipeline';

async function startTrainingProcess(trainingJob) {
  const model = await trainModel({
    dataPath: trainingJob.filePath,
    targetColumn: 'target',
    modelType: 'xgboost'
  });
  
  // Save model
  await saveModel(model, trainingJob.datasetId);
}
```

### Add Real Azure Deployment
```typescript
// In /api/predictml/admin/approve-deployment/route.ts
import { AzureMLClient } from '@azure/ml';

async function deployToAzure(job) {
  const client = new AzureMLClient(credentials);
  const endpoint = await client.createEndpoint({
    modelPath: `./models/${job.datasetId}`,
    compute: 'cpu-cluster'
  });
  
  return endpoint.scoringUri;
}
```

---

## 📚 More Resources

- [AUTOMATED-TRAINING-WORKFLOW.md](./AUTOMATED-TRAINING-WORKFLOW.md) - Complete workflow docs
- [ADMIN-VS-USER-DASHBOARD.md](./ADMIN-VS-USER-DASHBOARD.md) - Dashboard comparison
- [IMPLEMENTATION-COMPLETE.md](./IMPLEMENTATION-COMPLETE.md) - Implementation summary

---

## 💡 Pro Tips

1. **Test with real data:** Use actual CSV files with proper column names
2. **Monitor progress:** Keep both user and admin dashboards open
3. **Check logs:** Training logs show each step
4. **Try both deployments:** Test local and Azure options
5. **Test rejection:** See how rejection flow works

---

**Ready to test?** Start with Step 1 above! 🚀
