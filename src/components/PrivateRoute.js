import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import userContext from '../context/userContext/userContext';

const PrivateRoute = ({ exact, component: Component, ...rest }) => {
    const contextAuth = useContext(userContext);
    const { auth } = contextAuth;
    return (
        <Route
            {...rest}
            render={(props) =>
                auth ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

export default PrivateRoute;
