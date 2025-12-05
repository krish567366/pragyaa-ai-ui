# PredictML Report Generation Setup Guide

## Overview
This system automatically generates comprehensive ML analysis reports from uploaded Excel/CSV files. The report generator is model-agnostic and works with any prediction model (HR Attrition, Customer Churn, Fraud Detection, etc.).

## Architecture

```
User uploads file → Next.js API → Python Script → Generated Report → Download
```

### Components
1. **Generic Report Generator** (`scripts/generic_ml_report_generator.py`)
   - Model-agnostic report generation
   - Automatic feature detection
   - Statistical analysis and visualization
   - Professional DOCX report output

2. **Integration Script** (`scripts/generate_report.py`)
   - Called by Next.js API
   - Handles file processing
   - Returns JSON status

3. **API Endpoints**:
   - `/api/predictml/upload` - File upload
   - `/api/predictml/generate-report` - Trigger report generation
   - `/api/predictml/download/[reportId]` - Download generated report

## Installation

### 1. Install Python Dependencies

Create a `requirements.txt` file:

```bash
cat > requirements.txt << EOF
pandas>=2.0.0
numpy>=1.24.0
matplotlib>=3.7.0
seaborn>=0.12.0
python-docx>=0.8.11
openpyxl>=3.1.0
pillow>=10.0.0
EOF
```

Install dependencies:

```bash
# Create virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install packages
pip install -r requirements.txt
```

### 2. Make Scripts Executable

```bash
chmod +x scripts/generate_report.py
```

### 3. Create Required Directories

```bash
mkdir -p uploads/reports
```

### 4. Environment Setup

Add to your `.env.local`:

```env
# Python executable path (optional, defaults to 'python3')
PYTHON_PATH=python3

# Upload directory
UPLOAD_DIR=./uploads

# Maximum file size (bytes)
MAX_FILE_SIZE=10485760
```

## Usage

### For Any ML Model

The report generator automatically adapts to your data. You just need to specify:

1. **Target Column**: The column you're predicting (e.g., "Attrition", "Churned", "Fraud")
2. **Model Name**: A descriptive name (e.g., "HR Attrition Prediction")
3. **Positive Class**: The value representing the positive outcome (e.g., "Yes", 1, True)

### Example: HR Attrition

```python
from generic_ml_report_generator import generate_report_from_upload

generate_report_from_upload(
    file_path="hr_data.xlsx",
    target_column="Attrition",
    model_name="HR Attrition Prediction",
    positive_class="Yes"
)
```

### Example: Customer Churn

```python
generate_report_from_upload(
    file_path="customer_data.csv",
    target_column="Churned",
    model_name="Customer Churn Prediction",
    positive_class=1
)
```

### Example: Fraud Detection

```python
generate_report_from_upload(
    file_path="transactions.csv",
    target_column="Is_Fraud",
    model_name="Fraud Detection Model",
    positive_class=True
)
```

## Report Features

The generated report automatically includes:

### 1. Executive Summary
- Overall statistics
- Key findings
- Data quality metrics

### 2. Data Overview
- Dataset size and dimensions
- Feature types (numeric, categorical, temporal)
- Missing value analysis

### 3. Target Variable Analysis
- Distribution visualization
- Class balance
- Rate calculations

### 4. Feature Analysis
**Categorical Features:**
- Rate by category
- Top/bottom performers
- Statistical significance

**Numerical Features:**
- Distribution plots
- Mean/median/std dev
- Comparison by target class

### 5. Temporal Analysis (if date columns present)
- Trends over time
- Seasonal patterns
- Monthly/quarterly breakdowns

### 6. Correlation Analysis
- Feature correlation matrix
- Heatmap visualization
- Key relationships

### 7. Risk Scoring
- Predictive risk scores (0-100)
- Risk distribution
- High-risk segment identification

### 8. Strategic Recommendations
- Data-driven insights
- Prioritized action items
- Expected impact estimates

### 9. Appendices
- Detailed statistics
- Methodology
- Technical notes

## API Integration

### Upload and Generate Report

```typescript
// 1. Upload file
const formData = new FormData();
formData.append('file', file);

const uploadResponse = await fetch('/api/predictml/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
  },
  body: formData,
});

const { reportId, filePath } = await uploadResponse.json();

// 2. Generate report
const generateResponse = await fetch('/api/predictml/generate-report', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    filePath,
    reportId,
    options: {
      targetColumn: 'Attrition',
      modelName: 'HR Attrition Prediction',
      positiveClass: 'Yes'
    }
  }),
});

const { downloadUrl } = await generateResponse.json();

// 3. Download report
window.open(downloadUrl, '_blank');
```

## Dashboard Updates

The dashboard now supports:

1. **File Upload**: Drag & drop or browse
2. **Report Generation**: Automatic upon upload
3. **Status Tracking**: Processing → Generating → Ready
4. **Report Download**: One-click download when ready

## Data Requirements

### Minimum Requirements
- At least 100 records
- Target/prediction column clearly identified
- Mix of features (numeric and/or categorical)

### Optimal Data Format

**Excel/CSV with columns like:**
```
| ID | Feature1 | Feature2 | Category1 | Date1 | Target |
|----|----------|----------|-----------|-------|--------|
| 1  | 25       | 50000    | TypeA     | 2024  | Yes    |
| 2  | 30       | 60000    | TypeB     | 2024  | No     |
```

### Supported File Types
- Excel (.xlsx, .xls)
- CSV (.csv)
- Maximum size: 10MB (configurable)

## Customization

### Adding Custom Charts

Edit `generic_ml_report_generator.py`:

```python
def _add_custom_chart(self, doc):
    """Add your custom visualization"""
    plt.figure(figsize=(10, 6))
    # Your plotting code here
    plt.savefig('/tmp/custom_chart.png', dpi=300)
    plt.close()
    
    doc.add_picture('/tmp/custom_chart.png', width=Inches(6))
```

### Modifying Report Sections

The report generator is organized into methods:
- `_add_cover_page()`
- `_add_executive_summary()`
- `_add_target_analysis()`
- etc.

Simply override or extend these methods for custom sections.

### Adding Business Rules

```python
class CustomReportGenerator(GenericMLReportGenerator):
    def _add_custom_business_rules(self, doc):
        # Add your business-specific analysis
        doc.add_heading('Business Rules Analysis', level=1)
        # Your code here
```

## Troubleshooting

### Python script not found
```bash
# Check path
ls scripts/generate_report.py

# Make executable
chmod +x scripts/generate_report.py
```

### Missing Python packages
```bash
pip install -r requirements.txt
```

### Report generation fails
Check logs:
```bash
# In terminal where Next.js is running
# Look for Python errors in console
```

### File upload fails
- Check file size (max 10MB)
- Verify file format (.xlsx, .xls, .csv)
- Ensure uploads directory exists

## Production Deployment

### 1. Environment Variables
```env
PYTHON_PATH=/usr/bin/python3
UPLOAD_DIR=/var/app/uploads
MAX_FILE_SIZE=10485760
REPORTS_DIR=/var/app/uploads/reports
```

### 2. File Storage
Consider using cloud storage:
- AWS S3
- Azure Blob Storage
- Google Cloud Storage

### 3. Background Jobs
Use a job queue for report generation:
- Bull (Redis-based)
- AWS SQS
- Azure Queue Storage

### 4. Monitoring
- Log all report generations
- Track success/failure rates
- Monitor generation time
- Alert on failures

### 5. Scalability
- Queue system for multiple concurrent requests
- Separate server for Python processing
- CDN for report downloads
- Database for metadata

## Examples

See `/scripts/examples/` for sample data and use cases:
- HR Attrition
- Customer Churn
- Fraud Detection
- Sales Forecasting
- Inventory Prediction

## Support

For issues or questions:
1. Check logs in `/uploads/logs/`
2. Verify Python dependencies
3. Test with sample data
4. Review API responses

## License

Proprietary - Pragyaa ML Platform
