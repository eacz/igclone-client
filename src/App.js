import './App.css';
import UserState from './context/userContext/userState';
import React from 'react';
import authToken from './config/authToken';

import AppRouter from './routers/AppRouter';
function App() {
    const token = localStorage.getItem('ig-token');
    authToken(token);

    return (
        <UserState>
            <AppRouter />
        </UserState>
    );
}

export default App;
