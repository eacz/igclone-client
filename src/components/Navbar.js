import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const user = false;
    return (
        <div className="navbar-m">
            {user? null : (
                <>
                <NavLink to="login">Login</NavLink>
                <NavLink to="signup">Signup</NavLink>
                </>
            )}
            <NavLink to="/">
                <i className="fas fa-home"></i>
            </NavLink>
            <NavLink to="/profile">
                <img
                    src="https://images.unsplash.com/photo-1585925130019-eeafcd31b7f3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    alt="profile"
                />
            </NavLink>
        </div>
    );
};

export default Navbar;
