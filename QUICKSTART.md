# 🚀 Quick Start Guide - PredictML AutoML

## One-Command Setup

```bash
./setup-automl.sh && npm run dev
```

That's it! The script will:
- ✅ Create all directories
- ✅ Initialize tracking files
- ✅ Set up Python environment
- ✅ Install all dependencies
- ✅ Start the dev server

---

## 📋 Manual Setup (if needed)

### 1. Create Directories
```bash
mkdir -p models uploads scripts
```

### 2. Initialize Tracking Files
```bash
echo "[]" > uploads/training-jobs.json
echo "[]" > uploads/datasets-metadata.json  
echo "[]" > uploads/deployments.json
```

### 3. Python Environment
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 4. Node Dependencies
```bash
npm install
```

### 5. Start Server
```bash
npm run dev
```

---

## 🎯 Test the Complete Workflow

### Step 1: User Uploads Data (2 min)

```bash
# 1. Open browser
open http://localhost:3000/predictml

# 2. Login as user
Email: demo@predictml.com
Password: demo123

# 3. Upload CSV file
- Click "Choose File"
- Select your dataset (must have headers)
- System will detect columns

# 4. Select Target Column
- Dropdown shows all columns
- System suggests likely target
- Or choose manually

# 5. Click "Upload & Train"
- File uploads
- Training starts automatically
- Progress bar shows: "Training... 35%"
```

### Step 2: AutoML Training (3-5 min)

```bash
# Happens automatically in background:
✓ Load dataset
✓ Auto-detect problem type (classification/regression)
✓ Setup PyCaret environment
✓ Train 20+ algorithms
✓ Compare models with cross-validation
✓ Select best model
✓ Save model with metrics

# User sees:
"Training... 85%"
"Training complete! Awaiting admin approval"
```

### Step 3: Admin Reviews & Approves (1 min)

```bash
# 1. Login as admin
open http://localhost:3000/predictml/admin

Email: admin@predictml.com
Password: admin123

# 2. View pending models
- See list of trained models
- Click on model to view details

# 3. Review metrics
Accuracy: 92%
F1 Score: 0.91
AUC: 0.95
Trained on: 1000 samples
Features: 9 columns

# 4. Approve for deployment
- Click "Approve for Deployment"
- Select: Local or Azure
- Click "Deploy"

✓ Model deployed!
```

### Step 4: Make Predictions (<1 sec)

```bash
# Via API:
curl -X POST http://localhost:3000/api/predictml/predict \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "datasetId": "report_1234567890",
    "inputData": {
      "age": 35,
      "income": 75000,
      "gender": "Male"
    }
  }'

# Response:
{
  "success": true,
  "prediction": [1],
  "probability": [{
    "class_0": 0.23,
    "class_1": 0.77
  }],
  "modelName": "RandomForestClassifier"
}
```

---

## 🧪 Test Data Examples

### Classification Example (customer-churn.csv)

```csv
age,income,tenure,num_products,is_active_member,credit_score,churn
35,75000,5,2,1,650,0
42,90000,8,3,1,720,0
28,55000,2,1,0,580,1
51,120000,15,4,1,800,0
```

Target column: `churn` (0 = stay, 1 = leave)

### Regression Example (house-prices.csv)

```csv
bedrooms,bathrooms,sqft,location_score,age,price
3,2,1500,8,10,250000
4,3,2200,9,5,450000
2,1,900,6,25,180000
5,4,3000,10,2,650000
```

Target column: `price`

---

## ⚡ Quick Commands

### Check Python Environment
```bash
source .venv/bin/activate
python --version  # Should be 3.8+
pip list | grep pycaret  # Should show pycaret
```

### View Training Logs
```bash
cat uploads/training-jobs.json | jq '.[-1]'  # Last training job
```

### View Deployments
```bash
cat uploads/deployments.json | jq '.'
```

### Clear All Data (reset)
```bash
rm -rf uploads/*.json models/*.pkl
echo "[]" > uploads/training-jobs.json
echo "[]" > uploads/datasets-metadata.json
echo "[]" > uploads/deployments.json
```

### Run Python Training Manually
```bash
source .venv/bin/activate
python scripts/automl_trainer.py \
  path/to/data.csv \
  target_column \
  auto \
  ./models
```

### Test Inference Manually
```bash
source .venv/bin/activate
python scripts/model_inference.py \
  models/12345_model.pkl \
  '{"age": 35, "income": 75000}'
```

---

## 🐛 Troubleshooting

### Issue: "Module 'pycaret' not found"
```bash
# Solution:
source .venv/bin/activate
pip install pycaret
```

### Issue: "Models directory not found"
```bash
# Solution:
mkdir -p models
```

### Issue: "Training job not found"
```bash
# Solution: Initialize tracking file
echo "[]" > uploads/training-jobs.json
```

### Issue: "Python script exited with code 1"
```bash
# Solution: Check logs
cat uploads/training-jobs.json | jq '.[-1].logs'

# Common fixes:
# 1. Target column doesn't exist
# 2. Dataset too small (need 50+ rows)
# 3. Missing dependencies
```

### Issue: Port 3000 already in use
```bash
# Solution: Use different port
PORT=3001 npm run dev
```

---

## 📊 Expected Performance

### Training Time (depends on dataset size):
- Small (< 1,000 rows): 1-2 minutes
- Medium (1,000-10,000 rows): 3-5 minutes
- Large (10,000-100,000 rows): 10-20 minutes

### Accuracy (typical results):
- Good datasets: 85-95% accuracy
- Imbalanced data: 70-85% accuracy
- Noisy data: 60-75% accuracy

### Model Types Trained:
- Logistic Regression
- Random Forest
- Gradient Boosting (XGBoost, LightGBM, CatBoost)
- SVM
- Naive Bayes
- K-Nearest Neighbors
- Decision Trees
- AdaBoost
- Extra Trees
- And more...

---

## 🎓 Best Practices

### Data Preparation:
1. **Clean data** - Remove duplicates, handle missing values
2. **Sufficient samples** - Minimum 50 rows, ideally 1000+
3. **Clear target column** - Make sure it's labeled correctly
4. **Balanced classes** - For classification, aim for balanced distribution
5. **CSV format** - Works best, Excel needs conversion

### Column Selection:
1. **Choose meaningful target** - What you want to predict
2. **Remove irrelevant columns** - IDs, timestamps (unless temporal)
3. **Numeric preferred** - Text columns need preprocessing
4. **No leakage** - Don't include future information

### Model Deployment:
1. **Test locally first** - Before Azure deployment
2. **Monitor performance** - Check prediction accuracy
3. **Retrain periodically** - As data changes over time
4. **Version models** - Keep track of different versions

---

## 📚 Documentation Links

- [AutoML Integration Guide](./AUTOML-INTEGRATION.md)
- [Workflow Gaps & Fixes](./WORKFLOW-GAPS-AND-FIXES.md)
- [Automated Training Workflow](./AUTOMATED-TRAINING-WORKFLOW.md)
- [Admin vs User Dashboard](./ADMIN-VS-USER-DASHBOARD.md)

---

## 🆘 Getting Help

### Check Logs:
```bash
# Training logs
cat uploads/training-jobs.json | jq '.[-1].logs'

# Dataset metadata
cat uploads/datasets-metadata.json | jq '.'

# Deployments
cat uploads/deployments.json | jq '.'
```

### Common Issues:
1. ❌ Training fails → Check target column exists
2. ❌ Can't find model → Check deployment status
3. ❌ Predictions fail → Ensure model is deployed
4. ❌ Low accuracy → Need more/better data

### Support:
- GitHub Issues: [Link to repo]
- Documentation: See files above
- Email: support@predictml.com (demo)

---

**Last Updated:** February 7, 2026  
**Version:** 2.0.0  
**Status:** Production Ready ✅
