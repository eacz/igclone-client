import { useReducer } from "react"
import { ADD_POSTS_FAILED, ADD_POSTS_SUCCESS, CLEAR_POSTS } from "../types";
import postContext from "./postContext";
import postReducer from "./postReducer"

const PostsState = (props) => {
    const initialState = {
        posts: [],
        loading: true,
        error: null
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

    return (
        <postContext.Provider value={{
            posts: state.posts,
            loading: state.loading,
            error: state.error,
            setInitialPosts,
            clearPosts,
            setPostError
        }}>
            {props.children}
        </postContext.Provider>
    )
}

export default PostsState