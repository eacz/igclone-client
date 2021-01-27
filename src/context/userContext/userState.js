import React, { useReducer } from 'react';
import Cookies from 'js-cookie'
import authToken from '../../config/authToken';
import axiosClient from '../../config/config';
import {
    LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT,
    MAINTAIN_SESSION,
    UPDATE_POSTS_SAVED,
    UPDATE_PROFILE_INFO,
    UPDATE_USER,
    UPDATE_USER_LIST,
} from '../types';
import userContext from './userContext';
import userReducer from './userReducer';

const UserState = (props) => {
    const initialState = {
        user: null,
        auth: false,
        token: localStorage.getItem('ig-token'),
        loading: false,
        error: null,
        listUserToDisplay: [],
    };
    const [state, dispatch] = useReducer(userReducer, initialState);

    const login = async (form) => {
        try {
            dispatch({ type: LOGIN });
            const data = await axiosClient.post('/auth/signin', form);
            const { token, user } = data.data;
            authToken(token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token,
                    user,
                },
            });
            Cookies.set('ig-clone-session', {...form, token}, {secure: true, sameSite: 'strict'})
            localStorage.setItem('ig-token', token);
            return null
        } catch (error) {
            dispatch({
                action: LOGIN_FAILED,
                payload: error.response.data.msg,
            });
            Cookies.remove('ig-clone-session')
            return error.response.data.msg
        }
    };

    const logout = () => {
        dispatch({ type: LOGOUT });
        Cookies.remove('ig-clone-session')
        localStorage.removeItem('ig-token');
        authToken();
    };

    const maintainSession = (user) => {
        dispatch({
            type: MAINTAIN_SESSION,
            payload: user,
        });
    };

    const updateUser = (user) => {
        dispatch({
            type: UPDATE_USER,
            payload: user,
        });
    };

    const updateProfile = user => {
        dispatch({
        type: UPDATE_PROFILE_INFO,
        payload: user
        })
    }

    const updatePostsSaved = (isSaved, postID) => {
        dispatch({type:UPDATE_POSTS_SAVED, payload: {isSaved, postID}})
    }
    //this is the user list that displays when likes, followers or following is clicked
    const updateListUser = (users) => {
        dispatch({
            type: UPDATE_USER_LIST,
            payload: users,
        });
    };

    return (
        <userContext.Provider
            value={{
                token: state.token,
                user: state.user,
                auth: state.auth,
                error: state.error,
                loading: state.loading,
                listUserToDisplay: state.listUserToDisplay,
                login,
                logout,
                maintainSession,
                updateUser,
                updateProfile,
                updateListUser,
                updatePostsSaved
            }}
        >
            {props.children}
        </userContext.Provider>
    );
};

export default UserState;
