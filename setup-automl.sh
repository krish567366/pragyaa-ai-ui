#!/bin/bash

# PredictML AutoML Setup Script
# This script sets up all required directories and files for the AutoML workflow

echo "🚀 Setting up PredictML AutoML environment..."
echo ""

# Create directories
echo "📁 Creating required directories..."
mkdir -p models
mkdir -p uploads
mkdir -p scripts
echo "✅ Directories created"
echo ""

# Initialize JSON tracking files if they don't exist
echo "📄 Initializing tracking files..."

if [ ! -f "uploads/training-jobs.json" ]; then
    echo "[]" > uploads/training-jobs.json
    echo "✅ Created training-jobs.json"
else
    echo "✓  training-jobs.json already exists"
fi

if [ ! -f "uploads/datasets-metadata.json" ]; then
    echo "[]" > uploads/datasets-metadata.json
    echo "✅ Created datasets-metadata.json"
else
    echo "✓  datasets-metadata.json already exists"
fi

if [ ! -f "uploads/deployments.json" ]; then
    echo "[]" > uploads/deployments.json
    echo "✅ Created deployments.json"
else
    echo "✓  deployments.json already exists"
fi

echo ""

# Check for Python
echo "🐍 Checking Python installation..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo "✅ Found $PYTHON_VERSION"
else
    echo "❌ Python 3 not found! Please install Python 3.8 or higher"
    exit 1
fi

echo ""

# Check if virtual environment exists
if [ -d ".venv" ]; then
    echo "✅ Virtual environment already exists"
else
    echo "📦 Creating virtual environment..."
    python3 -m venv .venv
    echo "✅ Virtual environment created"
fi

echo ""

# Activate virtual environment and install packages
echo "📦 Installing Python dependencies..."
echo "   This may take a few minutes..."
source .venv/bin/activate

# Upgrade pip first
pip install --upgrade pip > /dev/null 2>&1

# Install packages from requirements.txt
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
    if [ $? -eq 0 ]; then
        echo "✅ Python packages installed successfully"
    else
        echo "❌ Failed to install some packages"
        echo "   Try running: source .venv/bin/activate && pip install -r requirements.txt"
    fi
else
    echo "❌ requirements.txt not found"
    exit 1
fi

echo ""

# Check Node.js
echo "📦 Checking Node.js dependencies..."
if [ -d "node_modules" ]; then
    echo "✅ Node modules already installed"
else
    echo "Installing Node.js dependencies..."
    npm install
    echo "✅ Node modules installed"
fi

echo ""

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "⚙️  Creating .env.local file..."
    cat > .env.local << EOF
# Python Configuration
PYTHON_PATH=$(pwd)/.venv/bin/python

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Admin Credentials (Demo)
ADMIN_EMAIL=admin@predictml.com
ADMIN_PASSWORD=admin123

# User Credentials (Demo)
USER_EMAIL=demo@predictml.com
USER_PASSWORD=demo123
EOF
    echo "✅ Created .env.local with configuration"
else
    echo "✓  .env.local already exists"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Start the development server:"
echo "   npm run dev"
echo ""
echo "2. Open your browser:"
echo "   http://localhost:3000/predictml"
echo ""
echo "3. Login credentials:"
echo "   User:  demo@predictml.com / demo123"
echo "   Admin: admin@predictml.com / admin123"
echo ""
echo "4. Upload a CSV file with your data"
echo "5. Select the target column to predict"
echo "6. Watch AutoML train 20+ models automatically!"
echo ""
echo "📚 Documentation:"
echo "   - AUTOML-INTEGRATION.md"
echo "   - WORKFLOW-GAPS-AND-FIXES.md"
echo "   - AUTOMATED-TRAINING-WORKFLOW.md"
echo ""
echo "🎉 Happy ML Training!"
echo ""
