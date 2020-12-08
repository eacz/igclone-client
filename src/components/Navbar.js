import React from 'react';
import {NavLink} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper white">
                <NavLink to="/" className="black-text brand-logo logo left">
                    Instagram
                </NavLink>
                <ul id="nav-mobile" className="right ">
                    <li>
                        <NavLink className="btn blue waves-effect waves-light text-white" to="/login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink className="blue-text" to="/signup">Sign up</NavLink>
                    </li>
                    <li>
                        <NavLink className="black-text" to="/profile">Profile</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
