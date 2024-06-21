import React from 'react';
import { Router } from './router/router';
import { ProgressBar } from './components/ProgressBar/ProgressBar';

export const App = () => {
    return (
        <>
            <ProgressBar />
            <Router />
        </>
    )
}

export default App;