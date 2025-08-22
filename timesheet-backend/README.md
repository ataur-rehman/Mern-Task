# Timesheet Backend

## Installation

```bash
npm install
```

## Environment Setup

Copy the `.env.example` file to `.env` and update the MongoDB connection string:

```bash
cp .env.example .env
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### Timesheets
- `GET /api/timesheets` - Get all timesheets
- `GET /api/timesheets/:id` - Get single timesheet
- `POST /api/timesheets` - Create new timesheet
- `PUT /api/timesheets/:id` - Update timesheet
- `DELETE /api/timesheets/:id` - Delete timesheet

### Data
- `GET /api/data/all` - Get all seed data
- `GET /api/data/cases` - Get case data
- `GET /api/data/time-durations` - Get time duration options
- `GET /api/data/timesheet-types` - Get timesheet types
- `GET /api/data/sub-row-types` - Get sub-row types

### Health Check
- `GET /api/health` - Check API status

## Database Schema

### Timesheet
```javascript
{
  name: String,
  type: String,
  date: Date,
  case: String,
  description: String,
  subRows: [{
    type: String,
    rate: Number,
    quantity: Number,
    status: Boolean,
    amount: Number
  }]
}
```

## Deployment

The backend is ready for deployment on platforms like Render, Heroku, or Railway.
