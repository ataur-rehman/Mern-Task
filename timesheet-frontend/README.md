# Timesheet Frontend

A modern React TypeScript application for timesheet management with Material-UI components.

## Features

- ✅ Dynamic timesheet rows with add/delete functionality
- ✅ Sub-rows for billing items (Working Time, Travel Time, Kilometers)
- ✅ Auto-calculation of amounts (Rate × Quantity)
- ✅ Date picker with default to today
- ✅ Case selection with auto-rate filling
- ✅ Real-time validation
- ✅ Material-UI components for professional UI
- ✅ TypeScript for type safety
- ✅ Context API for state management

## Installation

```bash
npm install
```

## Environment Setup

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Update the API URL if needed (default: `http://localhost:5000/api`).

## Running the Application

### Development Mode
```bash
npm start
```

### Build for Production
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── TimesheetManager.tsx    # Main component
│   ├── TimesheetRow.tsx        # Individual timesheet row
│   └── SubRowComponent.tsx     # Billing item sub-row
├── context/
│   └── AppContext.tsx          # Global state management
├── services/
│   └── api.ts                  # API service layer
├── types/
│   └── index.ts               # TypeScript interfaces
└── App.tsx                    # Root component
```

## Key Components

### TimesheetManager
- Main container component
- Handles CRUD operations
- Manages local and server state
- Provides snackbar notifications

### TimesheetRow
- Individual timesheet entry
- Form validation
- Auto-rate filling from case selection
- Dynamic sub-row management

### SubRowComponent
- Billing item details
- Type-specific quantity inputs
- Real-time amount calculation
- Billable status checkbox

## State Management

Uses React Context API with useReducer for:
- Timesheet data
- Seed data (cases, durations, types)
- Loading states
- Error handling

## Deployment

The application is ready for deployment on:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

For Vercel deployment:
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
