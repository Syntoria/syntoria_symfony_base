import React from 'react';
import { Router } from './router/router';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { ThemeProvider, createTheme } from '@mui/material';

const baseTheme = createTheme({
    palette: {
        primary: {
            light: '#ececfe',
            main: '#443df6',
            dark: '#3d37dd',
        }
    },
});

export const App = () => {
    return (
        <ThemeProvider theme={baseTheme}>
            <ProgressBar />
            <Router />
        </ThemeProvider>
    )
}

export default App;