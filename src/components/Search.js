import React, { useContext } from 'react';
import searchContext from '../context/searchContext/searchContext';
import Header from './Layout/Header';
import Spinner from './Layout/Spinner';
import UserListItem from './UserListItem';

const Search = () => {
    const { usersSearch, loading, msg, error } = useContext(
        searchContext
    );
    /* no cleanup bc you can't go back on the users search
    useEffect(() => {
        return () => {
            clearSearch();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); */
    return (
        <>
            <Header />
            <div className="userlist">
                {loading && (
                    <div className="center-spinner">
                        <Spinner />
                    </div>
                )}

                {msg && <p className="search-p">{msg}</p>}
                {error && <p className="search-p red-text">{error}</p>}
                {usersSearch.map((user) => (
                    <UserListItem key={user._id} userL={user} />
                ))}
            </div>
        </>
    );
};

export default Search;
