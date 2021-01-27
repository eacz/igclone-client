import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Cookies from 'js-cookie';

import Routes from './Routes';
import userContext from '../context/userContext/userContext';
import LoadingScreen from '../components/Layout/LoadingScreen';

const AppRouter = () => {
    const ContextUser = useContext(userContext);
    const { login, auth, loading } = ContextUser;

    useEffect(() => {
        const user = Cookies.get('ig-clone-session');
        if (user) {
            login(JSON.parse(user));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <Router>
            <Routes isAuth={auth} />
        </Router>
    );
};

export default AppRouter;
