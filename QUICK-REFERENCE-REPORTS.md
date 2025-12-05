# Quick Reference: Report Generation System

## 🚀 One-Command Setup

```bash
# Install Python dependencies
pip install pandas numpy matplotlib seaborn python-docx openpyxl pillow

# Create directories
mkdir -p uploads/reports

# Start server
npm run dev
```

## 📊 Generate Report (Python Direct)

```python
from scripts.generic_ml_report_generator import generate_report_from_upload

# Any dataset, any model!
generate_report_from_upload(
    file_path="your_data.xlsx",          # Your file
    target_column="YourTargetColumn",    # Column to predict
    model_name="Your Model Name",        # Display name
    positive_class="Yes"                 # Positive outcome value
)
```

## 🌐 Via Dashboard

1. Go to: http://localhost:3000/predictml/login
2. Login: demo@predictml.com / demo123
3. Upload Excel/CSV file
4. **Wait 30-60 seconds** (report generates automatically!)
5. Download your comprehensive report

⚡ **NEW**: Reports are generated instantly! No 24-hour wait!

## 📝 Report Includes (Automatic)

✅ Executive Summary
✅ Data Quality Analysis  
✅ Target Variable Distribution
✅ Feature Analysis (All Types)
✅ Correlation Matrix
✅ Risk Scoring (0-100)
✅ Strategic Recommendations
✅ Professional Visualizations

## 🎯 Use Cases

| Use Case | Target Column | Positive Class |
|----------|---------------|----------------|
| HR Attrition | Attrition | Yes |
| Customer Churn | Churned | 1 or True |
| Fraud Detection | Is_Fraud | True or 1 |
| Sales Prediction | High_Value | Yes |
| Loan Default | Defaulted | Yes |
| Hospital No-Shows | No_Show | Yes |

## 🔧 Key Files

```
scripts/generic_ml_report_generator.py  ← Main generator
scripts/generate_report.py              ← CLI interface
app/api/predictml/upload/route.ts       ← Upload API
app/api/predictml/generate-report/      ← Generation API
app/api/predictml/download/             ← Download API
```

## 🎨 Customization Quick Hits

### Add Custom Chart
```python
def _add_my_chart(self, doc):
    plt.figure(figsize=(10, 6))
    # Your plot code
    plt.savefig('/tmp/my_chart.png', dpi=300)
    doc.add_picture('/tmp/my_chart.png', width=Inches(6))
```

### Add Custom Section
```python
def create_report(self, output_path):
    # ... existing code ...
    self._add_my_custom_section(doc)
    # ... continue ...
```

### Change Colors
```python
# At top of file
sns.set_palette("your_palette_name")
plt.style.use('your_style')
```

## 🐛 Quick Fixes

**Python not found:**
```bash
which python3  # Find path
# Add to .env.local: PYTHON_PATH=/path/to/python3
```

**Module errors:**
```bash
pip install -r requirements.txt
```

**Upload fails:**
```bash
mkdir -p uploads/reports
chmod 777 uploads  # Development only!
```

## 💡 Pro Tips

1. **Auto-detection**: System automatically finds feature types
2. **Any format**: Excel (.xlsx, .xls) or CSV (.csv)
3. **No preprocessing**: Upload raw data, system handles it
4. **Multiple models**: Same code for all your ML models
5. **Professional output**: Executive-ready DOCX reports

## 📚 Full Documentation

- `REPORT-GENERATION-SETUP.md` - Complete setup guide
- `REPORT-GENERATION-COMPLETE.md` - Implementation details
- `PREDICTML-AUTH-IMPLEMENTATION.md` - Auth system docs
- `QUICKSTART-PREDICTML.md` - Quick start guide

## 🎯 Testing

### Test Python Script
```bash
python scripts/generate_report.py \
    test_data.xlsx \
    test_report_123 \
    '{"target_column": "target", "model_name": "Test"}'
```

### Test via API
```bash
curl -X POST http://localhost:3000/api/predictml/generate-report \
  -H "Authorization: Bearer your_token" \
  -H "Content-Type: application/json" \
  -d '{
    "filePath": "uploads/file.xlsx",
    "reportId": "report_123",
    "options": {
      "targetColumn": "Attrition",
      "modelName": "HR Analysis"
    }
  }'
```

## ✅ Checklist

Before showing to CEO:
- [ ] Install Python packages: `pip install -r requirements.txt`
- [ ] Create directories: `mkdir -p uploads/reports`
- [ ] Start server: `npm run dev`
- [ ] Test login: demo@predictml.com / demo123
- [ ] Upload sample file
- [ ] Verify report generates
- [ ] Test download

## 🎉 You're Done!

Your system now automatically generates professional ML reports for ANY model!
