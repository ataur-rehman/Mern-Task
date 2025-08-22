# Development Setup Guide

## 🛠️ Development Environment Setup

### 1. Prerequisites Installation

**Windows:**
```powershell
# Install Node.js (v16 or higher)
# Download from: https://nodejs.org/

# Install MongoDB Community Edition
# Download from: https://www.mongodb.com/try/download/community

# Or use MongoDB Atlas (cloud)
# Sign up at: https://www.mongodb.com/atlas
```

**macOS:**
```bash
# Using Homebrew
brew install node
brew install mongodb-community

# Or use nvm for Node.js version management
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

**Linux (Ubuntu/Debian):**
```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

### 2. Local Development Setup

**Clone and Install:**
```bash
# Clone the repository
git clone <your-repo-url>
cd timesheet-management

# Backend setup
cd timesheet-backend
npm install
cp .env.example .env

# Frontend setup
cd ../timesheet-frontend
npm install
cp .env.example .env
```

**Environment Configuration:**

**Backend (.env):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/timesheet-db
NODE_ENV=development
```

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Starting Development Servers

**Option 1: Manual Start**
```bash
# Terminal 1 - Backend
cd timesheet-backend
npm run dev

# Terminal 2 - Frontend
cd timesheet-frontend
npm start

# Terminal 3 - MongoDB (if local)
mongod
```

**Option 2: Using Concurrent Scripts (Recommended)**

Add to root package.json:
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd timesheet-backend && npm run dev",
    "dev:frontend": "cd timesheet-frontend && npm start",
    "install:all": "npm install && cd timesheet-backend && npm install && cd ../timesheet-frontend && npm install"
  },
  "devDependencies": {
    "concurrently": "^7.6.0"
  }
}
```

Then run:
```bash
npm run install:all
npm run dev
```

### 4. Testing the Setup

1. **Backend Health Check:**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Frontend Access:**
   Open http://localhost:3000

3. **API Testing:**
   ```bash
   # Get seed data
   curl http://localhost:5000/api/data/all
   
   # Test timesheet creation
   curl -X POST http://localhost:5000/api/timesheets \
     -H "Content-Type: application/json" \
     -d '{
       "name": "John Doe",
       "type": "Project Work",
       "date": "2025-08-22",
       "case": "Legal Consultation",
       "description": "Client consultation session",
       "subRows": [{
         "type": "Working Time",
         "rate": 150,
         "quantity": 2,
         "status": true,
         "amount": 300
       }]
     }'
   ```

### 5. Database Management

**Local MongoDB:**
```bash
# Connect to MongoDB shell
mongosh

# Switch to timesheet database
use timesheet-db

# View collections
show collections

# View timesheets
db.timesheets.find().pretty()

# Clear all data (if needed)
db.timesheets.deleteMany({})
```

**MongoDB Atlas:**
1. Create cluster at https://cloud.mongodb.com
2. Create database user
3. Whitelist your IP address
4. Get connection string
5. Update MONGODB_URI in .env

### 6. Troubleshooting

**Common Issues:**

1. **Port Already in Use:**
   ```bash
   # Kill process on port 5000
   lsof -ti:5000 | xargs kill -9
   
   # Or change PORT in backend .env
   PORT=5001
   ```

2. **MongoDB Connection Failed:**
   ```bash
   # Check if MongoDB is running
   brew services list | grep mongodb  # macOS
   sudo systemctl status mongod       # Linux
   
   # Start MongoDB
   brew services start mongodb-community  # macOS
   sudo systemctl start mongod           # Linux
   ```

3. **CORS Issues:**
   - Ensure frontend URL is correct in .env
   - Backend CORS is already configured for development

4. **TypeScript Errors:**
   ```bash
   cd timesheet-frontend
   npx tsc --noEmit  # Check for type errors
   ```

### 7. Development Workflow

1. **Feature Development:**
   ```bash
   git checkout -b feature/your-feature-name
   # Make changes
   git add .
   git commit -m "Add: your feature description"
   git push origin feature/your-feature-name
   ```

2. **Testing:**
   ```bash
   # Backend tests (when implemented)
   cd timesheet-backend
   npm test
   
   # Frontend tests
   cd timesheet-frontend
   npm test
   ```

3. **Code Quality:**
   ```bash
   # Lint frontend code
   cd timesheet-frontend
   npm run lint
   ```

### 8. Production Build Testing

```bash
# Backend production build
cd timesheet-backend
NODE_ENV=production npm start

# Frontend production build
cd timesheet-frontend
npm run build
npx serve -s build
```

### 9. IDE Configuration

**VS Code Extensions:**
- ES7+ React/Redux/React-Native snippets
- TypeScript Hero
- MongoDB for VS Code
- Thunder Client (API testing)
- Auto Rename Tag
- Bracket Pair Colorizer

**VS Code Settings (.vscode/settings.json):**
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

This setup guide should get your development environment running smoothly! 🚀
