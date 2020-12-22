import { CLEAR_SEARCH, SEARCH_EMPTY, SEARCH_FAILED, SEARCH_SUCCESS, START_SEARCH } from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case START_SEARCH:
            return {
                ...state,
                loading: true,
                msg: 'Loading...',
                error: null,
                usersSearch: [],
                searchText: action.payload,
            };
        case SEARCH_EMPTY:
            return {...state, loading: false, msg: 'There is no match for your search', error: null, usersSearch: []}
        case SEARCH_SUCCESS:
            return {...state, loading: false, msg: '', error: null, usersSearch: action.payload}
        case SEARCH_FAILED:
            return {...state, loading: false, msg: '', error: null, usersSearch: []}
        case CLEAR_SEARCH:
            return {...state, usersSearch: [], searchText: '', msg: '', error: null}
        default:
            return state;
    }
};
