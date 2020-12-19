import { useReducer } from "react"
import { ADD_POSTS_FAILED, ADD_POSTS_SUCCESS, CLEAR_POSTS, SET_POST_COMMENTS_TO_FETCH, UPDATE_LIKES } from "../types";
import postContext from "./postContext";
import postReducer from "./postReducer"

const PostsState = (props) => {
    const initialState = {
        posts: [],
        loading: true,
        error: null,
        postCommentsToFetch: null
    }

    const [state, dispatch] = useReducer(postReducer, initialState);

    const setInitialPosts = (posts) => {
        dispatch({type: ADD_POSTS_SUCCESS, payload: posts})
    }

    const setPostError = (error) => {
        dispatch({type: ADD_POSTS_FAILED, payload: error})
    }

    const clearPosts = () => {
        dispatch({type:CLEAR_POSTS})
    }

    const updateLikes = (postID, userID) => {
        dispatch({
            type: UPDATE_LIKES,
            payload: {postID, userID}
        })
    }

    const setCommentsToFetch = postID => {
        dispatch({
            type: SET_POST_COMMENTS_TO_FETCH,
            payload: postID
        })
    }

    return (
        <postContext.Provider value={{
            posts: state.posts,
            loading: state.loading,
            error: state.error,
            postCommentsToFetch: state.postCommentsToFetch,
            setInitialPosts,
            clearPosts,
            setPostError,
            updateLikes,
            setCommentsToFetch
            
        }}>
            {props.children}
        </postContext.Provider>
    )
}

export default PostsState