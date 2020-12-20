/* eslint-disable import/no-anonymous-default-export */

import {
    ADD_COMMENT,
    ADD_POSTS,
    ADD_POSTS_FAILED,
    ADD_POSTS_SUCCESS,
    CLEAR_POSTS,
    SET_POST_COMMENTS_TO_FETCH,
    UPDATE_LIKES,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_POSTS:
            return { ...state, loading: true, error: null };
        case ADD_POSTS_SUCCESS:
            return { ...state, loading: false, posts: action.payload };
        case ADD_POSTS_FAILED:
            return { ...state, loading: false, error: action.payload };
        case CLEAR_POSTS:
            return { ...state, posts: [], loading: true, error: null };
        case UPDATE_LIKES:
            const postsUpdated = state.posts.filter((post) =>
                post._id === action.payload.postID // first search for the specified post
                    ? post.likes.includes(action.payload.userID) //if the user already likes the post
                        ? (post.likes = post.likes.filter(
                              (id) => (id === action.payload.userID ? null : id) // the user's id is removed
                          ))
                        : post.likes.push(action.payload.userID) // if not, is added
                    : post
            );
            return { ...state, posts: postsUpdated };
        case SET_POST_COMMENTS_TO_FETCH:
            return { ...state, postCommentsToFetch: action.payload };
        case ADD_COMMENT:
            const postsUpd = state.posts.filter((post) =>
                post._id === action.payload.post
                    ? post.comments.push(action.payload)
                    : post
            );
            return { ...state, posts: postsUpd };
        default:
            return state;
    }
};
