import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import userContext from '../context/userContext/userContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const contextAuth = useContext(userContext);
    const { auth } = contextAuth;
    return auth ? (
        <Route {...rest} render={(props) => <Component {...props} />} />
    ) : (
        <Redirect to="/login" />
    );
};

export default PrivateRoute;