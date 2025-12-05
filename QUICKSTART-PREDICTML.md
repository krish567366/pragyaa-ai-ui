# Quick Start Guide - PredictML Login & Dashboard

## 🚀 Getting Started

### Step 1: Start the Development Server
```bash
npm run dev
```
The app will be available at http://localhost:3000

### Step 2: Navigate to PredictML
Go to: http://localhost:3000/predictml

You'll see the PredictML homepage with a new **"Login to Dashboard"** button.

### Step 3: Login
Click the **"Login to Dashboard"** button or go directly to:
http://localhost:3000/predictml/login

**Demo Credentials:**
```
Email: demo@predictml.com
Password: demo123
```

### Step 4: Upload Your Data
Once logged in, you'll be on the dashboard where you can:
1. **Drag & drop** an Excel or CSV file
2. **Or click** the upload area to browse
3. Click **"Upload and Process"**

### Step 5: Track Your Reports
After uploading, you'll see your file in the reports list with status:
- 🔄 **Processing** - File is being analyzed
- ⏳ **Pending (24hrs)** - Model training in progress
- ✅ **Ready** - Download available

## 📁 Supported File Types
- Excel (.xlsx, .xls)
- CSV (.csv)
- Max size: 10MB

## 🎯 Key Features

### Login Page
- Modern authentication form
- Demo credentials provided
- Error handling
- Auto-redirect if already logged in

### Dashboard
- Protected route (must login first)
- Drag & drop file upload
- Real-time upload status
- Reports history
- Download functionality
- User profile display
- Logout button

## 🔐 Security Features
- Token-based authentication
- Protected routes
- Session persistence
- Secure logout

## 🎨 Design
- Matches PredictML purple/pink gradient theme
- Responsive design
- Smooth animations
- Modern glassmorphism effects

## 📝 API Endpoints

### POST /api/predictml/login
Login with credentials
```json
{
  "email": "demo@predictml.com",
  "password": "demo123"
}
```

### POST /api/predictml/upload
Upload Excel/CSV file (requires authentication)
- Header: `Authorization: Bearer <token>`
- Body: FormData with file

## 🐛 Troubleshooting

### Can't login?
Make sure you're using the correct demo credentials:
- Email: demo@predictml.com
- Password: demo123

### File upload not working?
Check:
- File is .xlsx, .xls, or .csv
- File size is under 10MB
- You're logged in

### Redirected to login when accessing dashboard?
This is expected - you must login first to access the dashboard.

## 💡 Tips

1. **Test the full flow**: Login → Upload → Check status → Logout
2. **Try drag & drop**: It's more intuitive than clicking
3. **Multiple uploads**: You can upload multiple files and track them all
4. **Stay logged in**: Your session persists across page refreshes

## 📱 Mobile Friendly
The entire system is responsive and works great on mobile devices!

## 🔄 What Happens After Upload?

1. File is validated and uploaded
2. Status shows "Processing" for 2 seconds
3. Status changes to "Pending (24hrs)"
4. Message: "Come back after 24 hours - we are preparing the model for you"
5. (In production) Email notification when ready
6. (In production) Download button appears when status is "Ready"

## 🎓 For Developers

### File Structure
```
app/
├── predictml/
│   ├── login/page.tsx          ← Login page
│   ├── dashboard/page.tsx      ← Dashboard with upload
│   └── page.tsx                ← Homepage (with login button)
├── api/predictml/
│   ├── login/route.ts          ← Auth API
│   └── upload/route.ts         ← Upload API
├── context/
│   └── AuthContextProvider.tsx ← Auth state management
└── components/
    └── Providers.tsx           ← Global providers
```

### Auth Context Usage
```tsx
import { useAuth } from '../context/AuthContextProvider';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please login</div>;
  }
  
  return <div>Welcome {user.name}</div>;
}
```

## 🚀 Ready for Production?

Before deploying:
1. ✅ Replace mock auth with real database
2. ✅ Set up cloud storage for files
3. ✅ Implement actual ML processing
4. ✅ Add email notifications
5. ✅ Use environment variables
6. ✅ Enable HTTPS
7. ✅ Add monitoring/logging

See `PREDICTML-AUTH-IMPLEMENTATION.md` for detailed production checklist.
