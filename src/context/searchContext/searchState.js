import React, { useReducer } from 'react';
import axiosClient from '../../config/config';
import { START_SEARCH, SEARCH_EMPTY, SEARCH_SUCCESS, SEARCH_FAILED, CLEAR_SEARCH } from '../types';
import searchContext from './searchContext';
import searchReducer from './searchReducer';

const SearchState = (props) => {
    const initialState = {
        searchText: '',
        usersSearch: [],
        loading: false,
        error: null,
        msg: '',
    };
    const [state, dispatch] = useReducer(searchReducer, initialState);

    const search = async (search) => {
        dispatch({ type: START_SEARCH, payload: search });
        try {
            const searchResult = await axiosClient(`/user/search/${search}`);
            if (searchResult.data.users.length === 0) {
                dispatch({ type: SEARCH_EMPTY });
                return;
            }
            dispatch({
                type: SEARCH_SUCCESS,
                payload: searchResult.data.users,
            });
        } catch (error) {
            console.log(error);
            dispatch({type: SEARCH_FAILED, payload: error.message})
        }
    };

    const clearSearch = () => {
        dispatch({type: CLEAR_SEARCH})
    }

    return (
        <searchContext.Provider
            value={{
                searchText: state.searchText,
                usersSearch: state.usersSearch,
                loading: state.loading,
                error: state.error,
                msg: state.msg,
                search,
                clearSearch
            }}
        >
            {props.children}
        </searchContext.Provider>
    );
};

export default SearchState;
