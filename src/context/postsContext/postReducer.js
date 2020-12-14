/* eslint-disable import/no-anonymous-default-export */

import { ADD_POSTS, ADD_POSTS_FAILED, ADD_POSTS_SUCCESS, CLEAR_POSTS } from '../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_POSTS:
            return { ...state, loading: true, error: null };
        case ADD_POSTS_SUCCESS:
            return { ...state, loading: false, posts: action.payload };
        case ADD_POSTS_FAILED:
            return {...state, loading: false, error: action.payload}
        case CLEAR_POSTS:
            return {...state, posts: [], loading: true, error: null}
        default:
            return state;
    }
};
