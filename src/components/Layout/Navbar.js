import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import userContext from '../../context/userContext/userContext';

const Navbar = () => {
    const contextUser = useContext(userContext);
    const { auth, user, logout } = contextUser;
    const { pathname } = useLocation();

    return (
        <div className="navbar-m">
            {auth ? (
                <>
                    <NavLink to="/">
                        <i className="fas fa-home"></i>
                    </NavLink>
                    <NavLink to="/profile">
                        <img src={user.photo} alt="profile" />
                    </NavLink>{' '}
                    {pathname === '/profile' && (
                        <>
                            <NavLink onClick={() => logout()} to="/login">
                                <i className="fas fa-sign-out-alt red-text"></i>
                            </NavLink>
                            <NavLink to="/newpost">
                                <i className="fas fa-plus blue-text"></i>
                            </NavLink>
                        </>
                    )}
                </>
            ) : (
                <>
                    <NavLink className="btn blue" to="login">
                        Login
                    </NavLink>
                    <NavLink to="signup">Signup</NavLink>
                </>
            )}
        </div>
    );
};

export default Navbar;
