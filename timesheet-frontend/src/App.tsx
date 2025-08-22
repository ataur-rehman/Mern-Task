import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AppProvider } from './context/AppContext';
import TimesheetManager from './components/TimesheetManager';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <TimesheetManager />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
