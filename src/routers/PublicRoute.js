import React  from 'react';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, isAuth, ...rest }) => {
    return (
        <Route
            {...rest}
            component={(props) =>
                isAuth ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    );
};

export default PublicRoute;
