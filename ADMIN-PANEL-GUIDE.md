# Admin Panel - Engineer Dashboard

## 🚀 Access the Admin Panel

**URL**: `http://localhost:3000/predictml/admin`

**Admin Credentials:**
```
Email: admin@predictml.com
Password: admin123
```

## 📋 Features

### 1. **Data Queue View**
- See all uploaded CSV/Excel files from clients
- View file metadata (filename, upload date, client email, size)
- Real-time status tracking

### 2. **File Status Management**
Engineers can manage files through different stages:

#### Status Workflow:
1. **🟡 Pending Review** (Initial state)
   - File just uploaded by client
   - Engineer needs to review the data
   - Actions: Approve or Reject

2. **🟢 Approved** 
   - Data quality verified by engineer
   - Ready for training
   - Action: Start Training

3. **🔵 Training**
   - Model training is in progress
   - Engineer monitors the training process
   - Action: Mark as Trained (when complete)

4. **🟣 Trained**
   - Model training completed
   - Client can now run predictions and see charts
   - No further action needed

5. **🔴 Rejected**
   - Data quality issues or client request
   - Client notified to re-upload

### 3. **File Details Panel**
When a file is selected, engineers can:
- View detailed file information
- See data quality metrics
- Update file status
- Download the original file for review

### 4. **Download Files**
Engineers can download uploaded CSV/Excel files to:
- Review data quality manually
- Check for issues
- Validate transformations

## 🔄 Workflow Example

### Client Side:
1. Client logs in (`demo@predictml.com`)
2. Uploads Equitas employee data (CSV/Excel)
3. Reviews data validation results
4. Clicks "Proceed with ML Report Generation"
5. Sees status: "Pending Review by Engineer"
6. Waits for engineer approval

### Engineer Side (Admin Panel):
1. Engineer logs in (`admin@predictml.com`)
2. Opens Admin Panel (`/predictml/admin`)
3. Sees new file: `Equitas_18Nov25_exitpredictionsanalysis.xlsx`
4. Status: **Pending Review**
5. Clicks on file to select it
6. Reviews data info (25,821 rows, 22 columns)
7. Clicks **"✓ Approve for Training"**
8. Status changes to **Approved**
9. Clicks **"🚀 Start Training"**
10. Status changes to **Training**
11. (Waits for model training to complete)
12. Clicks **"✅ Mark as Trained"**
13. Status changes to **Trained**

### Client Side (After Training):
1. Client refreshes dashboard
2. Sees status: "Model Trained - Ready for Predictions"
3. Can now:
   - Run predictions
   - View charts and visualizations
   - Download analysis reports

## 🛡️ Security

- **Admin-Only Access**: Only `admin@predictml.com` can access `/predictml/admin`
- **Role-Based**: Regular users are redirected to dashboard
- **Token-Based**: All API calls require Bearer token authentication
- **Protected Routes**: Automatic redirect if not authenticated

## 📁 File Structure

```
app/
├── predictml/
│   └── admin/
│       └── page.tsx           ← Admin dashboard UI
├── api/predictml/admin/
│   ├── files/
│   │   └── route.ts          ← Get all uploaded files
│   ├── update-status/
│   │   └── route.ts          ← Update file training status
│   └── download/[fileId]/
│       └── route.ts          ← Download original files
```

## 🎯 API Endpoints

### GET `/api/predictml/admin/files`
Get all uploaded files with their status
- **Auth**: Required (Admin token)
- **Returns**: Array of file objects with metadata

### POST `/api/predictml/admin/update-status`
Update the status of a file
- **Auth**: Required (Admin token)
- **Body**: `{ fileId: string, status: string }`
- **Status Options**: 
  - `pending_review`
  - `approved`
  - `training`
  - `trained`
  - `rejected`

### GET `/api/predictml/admin/download/[fileId]`
Download the original uploaded file
- **Auth**: Not required for download
- **Returns**: File download

## 💡 Tips for Engineers

1. **Review Data Quality**: Always check file details before approving
2. **Use Status Files**: Status is saved in `uploads/[reportId]_status.json`
3. **Monitor Training**: Keep track of training progress externally
4. **Communicate**: Update status promptly so clients know their model status
5. **Download for Analysis**: Download files if you need to inspect data manually

## 🚧 Production Enhancements

For production deployment, consider adding:

1. **Real Database**: Store file metadata and status in PostgreSQL/MongoDB
2. **Training Integration**: Connect to actual ML training pipeline
3. **Progress Tracking**: Real-time training progress updates
4. **Notifications**: Email/Slack alerts for status changes
5. **Logs**: Detailed training logs and error messages
6. **Model Versioning**: Track different model versions
7. **Performance Metrics**: Display model accuracy, F1 score, etc.
8. **Data Preview**: Show sample rows from uploaded files
9. **Validation Reports**: Detailed data quality analysis
10. **User Management**: Full admin panel for managing client accounts

## 🐛 Troubleshooting

### Can't access admin panel?
- Make sure you're logged in with `admin@predictml.com`
- Regular users (`demo@predictml.com`) cannot access admin panel

### Files not showing up?
- Check if files are in the `uploads/` directory
- Verify files have the format: `report_[ID]_[filename].xlsx`

### Status not updating?
- Check if status files are being created in `uploads/[reportId]_status.json`
- Verify admin token is valid

## 🎓 Next Steps

1. ✅ **Test the flow**: Upload a file as demo user, then approve as admin
2. 🔄 **Integrate training**: Connect to your actual ML training pipeline
3. 📊 **Add metrics**: Display model performance metrics
4. 📧 **Add notifications**: Email clients when status changes
5. 🗄️ **Use database**: Replace file-based storage with proper DB
