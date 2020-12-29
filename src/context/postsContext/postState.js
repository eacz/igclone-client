import { useReducer } from "react"
import axiosClient from "../../config/config";
import { ADD_COMMENT, ADD_POSTS_FAILED, ADD_POSTS_SUCCESS, CLEAR_POSTS, DELETE_COMMENT, SET_POST_COMMENTS_TO_FETCH, SET_REFETCH, UPDATE_LIKES } from "../types";
import postContext from "./postContext";
import postReducer from "./postReducer"

const PostsState = (props) => {
    const initialState = {
        posts: [],
        loading: true,
        error: null,
        postCommentsToFetch: null,
        refetch: false,
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

    const addComment = (comment) => {
        dispatch({
            type: ADD_COMMENT,
            payload: comment
        })
    }

    const deleteComment = async comment => {
        try {
          await axiosClient.delete(`/comment/${comment._id}`);
          dispatch({type:DELETE_COMMENT, payload: comment})
        } catch (error) {
            console.log(error);
        }
    }

    const refetchPosts = () => {
        dispatch({type: SET_REFETCH})
    }

    return (
        <postContext.Provider value={{
            posts: state.posts,
            loading: state.loading,
            error: state.error,
            postCommentsToFetch: state.postCommentsToFetch,
            refetch: state.refetch,
            setInitialPosts,
            clearPosts,
            setPostError,
            updateLikes,
            setCommentsToFetch,
            addComment,
            deleteComment,
            refetchPosts
            
        }}>
            {props.children}
        </postContext.Provider>
    )
}

export default PostsState