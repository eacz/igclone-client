import React from 'react';
import { NavLink } from 'react-router-dom';

const Logo = () => {
    return (
        <NavLink to="/">
            <p className="logo logo-main">Instagram</p>
        </NavLink>
    );
};

export default Logo;
