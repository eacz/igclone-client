import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import postContext from '../../context/postsContext/postContext';
import searchContext from '../../context/searchContext/searchContext';
import userContext from '../../context/userContext/userContext';

const Navbar = () => {
    const history =useHistory()
    const contextUser = useContext(userContext);
    const { auth, user, logout } = contextUser;
    const { pathname } = useLocation();
    const { clearPosts } = useContext(postContext);
    const {search: startSearch} = useContext(searchContext)
    const [search, setSearch] = useState('');
    const input = useRef(null);
    const handleLogout = () => {
        clearPosts();
        logout();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        startSearch(search)
        if(pathname === '/'){
            history.push('/search')
        }
    };
    useEffect(() => {
        if(pathname !== '/search')return 
        input.current.focus();
    }, [pathname]);
    if (pathname === '/search' && auth) {
        return (
            <div className="navbar-m">
                <form onSubmit={handleSubmit}>
                    <input
                        ref={input}
                        className="search-page"
                        placeholder="Search"
                        type="text"
                        name="search"
                        id="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
                <NavLink to="/profile">
                    <img src={user.photo} alt="profile" />
                </NavLink>{' '}
            </div>
        );
    }

    return (
        <div className="navbar-m">
            {auth ? (
                <>
                    <NavLink to="/search">
                        <i className="fas fa-search"></i>
                    </NavLink>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="search"
                            placeholder="Search"
                            type="search"
                            name="search"
                            id="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect="off"
                        />
                    </form>
                    <NavLink to="/">
                        <i className="fas fa-home"></i>
                    </NavLink>
                    <NavLink to="/newpost">
                        <i className="fas fa-plus"></i>
                    </NavLink>
                    <NavLink to="/profile">
                        <img src={user.photo} alt="profile" />
                    </NavLink>{' '}
                    {pathname === '/profile' && (
                        <>
                            <NavLink onClick={() => handleLogout()} to="/login">
                                <i className="fas fa-sign-out-alt red-text"></i>
                            </NavLink>
                            <NavLink to="/profile/config">
                                <i className="fas fa-cog"></i>
                            </NavLink>
                        </>
                    )}
                </>
            ) : (
                <>
                    <NavLink className="btn blue" to="/login">
                        Login
                    </NavLink>
                    <NavLink to="/signup">Signup</NavLink>
                </>
            )}
        </div>
    );
};

export default Navbar;
