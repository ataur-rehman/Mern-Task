# How to Use This Project

## Quick Setup for Presentation

### Option 1: Development Mode (Full Features)
1. Open two terminals
2. Terminal 1 - Backend:
   `ash
   cd timesheet-backend
   npm install
   npm run dev
   `
3. Terminal 2 - Frontend:
   `ash
   cd timesheet-frontend
   npm install
   npm start
   `
4. Access: http://localhost:3000

### Option 2: Demo Mode (No Database Required)
1. Single terminal:
   `ash
   cd timesheet-backend
   npm install
   node test-server.js
   `
2. Frontend (separate terminal):
   `ash
   cd timesheet-frontend
   npm install
   npm start
   `
3. Access: http://localhost:3000

### Option 3: Concurrent Mode (Recommended)
1. From root directory:
   `ash
   npm install
   npm run dev
   `
2. Access: http://localhost:3000

## Key Features to Demonstrate

### 1. Time Input System
- Click on any time field to edit directly
- Use dropdown for 6-minute increments
- Automatic HH:MM:SS format validation

### 2. Dynamic Calculations
- Add billing items and watch real-time calculations
- Modify quantity/rate to see instant updates
- Grand total displays across all timesheets

### 3. Collapsible Interface
- Click timesheet headers to expand/collapse
- Clean organization of multiple entries

### 4. Professional UI
- Material-UI components
- Responsive design
- TypeScript integration

## Deployment Ready

This project is ready for:
- GitHub Pages (frontend)
- Heroku (full-stack)
- Vercel (frontend + serverless backend)
- Railway (full-stack)

## Internship Portfolio Value

 Full-stack development
 Modern tech stack (MERN + TypeScript)
 Professional UI/UX
 Real-world business application
 Clean, documented code
 Production-ready deployment
 GitHub best practices
