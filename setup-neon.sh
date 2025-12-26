#!/bin/bash

# Neon Database Setup Script for CareConnect 24/7
# This script helps you set up your Neon database connection

echo "🚀 Neon Database Setup for CareConnect 24/7"
echo "=============================================="
echo ""

# Check if .env.local already exists
if [ -f .env.local ]; then
    echo "⚠️  .env.local already exists!"
    read -p "Do you want to overwrite it? (y/n): " overwrite
    if [ "$overwrite" != "y" ]; then
        echo "Setup cancelled."
        exit 0
    fi
fi

echo "📋 Setup Steps:"
echo "1. Go to https://neon.tech and sign up (if you haven't)"
echo "2. Create a new project"
echo "3. Get your connection string from the dashboard"
echo ""
read -p "Press Enter when you have your connection string ready..."

echo ""
echo "Please paste your Neon connection string:"
echo "(It should look like: postgresql://user:pass@host.neon.tech/dbname?sslmode=require)"
read -p "Connection String: " connection_string

if [ -z "$connection_string" ]; then
    echo "❌ Error: Connection string cannot be empty"
    exit 1
fi

# Create .env.local file
echo "DATABASE_URL=$connection_string" > .env.local
echo ""
echo "✅ Created .env.local file with your connection string"
echo ""
echo "📝 Next Steps:"
echo "1. Go to your Neon dashboard → SQL Editor"
echo "2. Copy the contents of lib/schema.sql"
echo "3. Paste and run it in the SQL Editor"
echo "4. Run: npm run dev"
echo ""
echo "✨ Setup complete! Your .env.local file is ready."

