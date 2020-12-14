import React, { useReducer } from 'react';
import authToken from '../../config/authToken';
import axiosClient from '../../config/config';
import { LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT, MAINTAIN_SESSION, UPDATE_USER } from '../types';
import userContext from './userContext';
import userReducer from './userReducer';

const UserState = (props) => {
    const initialState = {
        user: null,
        auth: false,
        token: localStorage.getItem('ig-token'),
        loading: false,
        error: null,
    };
    const [state, dispatch] = useReducer(userReducer, initialState);

    const login = async (form) => {
        try {
            dispatch({type: LOGIN})
            const data = await axiosClient.post('/auth/signin', form);
            const { token, user } = data.data;
            authToken(token)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token,
                    user
                }
            })
            localStorage.setItem('ig-token', token);
            localStorage.setItem('ig-user', JSON.stringify(user));
        } catch (error) {
            dispatch({
                action: LOGIN_FAILED,
                payload: error.response?.data.msg,
            });
        }
    };

    const logout = () => {
        dispatch({type: LOGOUT})
        localStorage.removeItem('ig-token')
        localStorage.removeItem('ig-user')
        authToken()
    }

    const maintainSession = user => {
        dispatch({
            type: MAINTAIN_SESSION,
            payload: user
        })
    }

    const updateUser = user => {
        dispatch({
            type: UPDATE_USER,
            payload: user
        })
    }

    return (
        <userContext.Provider
            value={{
                token: state.token,
                user: state.user,
                auth: state.auth,
                error: state.error,
                loading: state.loading,
                login,
                logout,
                maintainSession,
                updateUser
            }}
        >
            {props.children}
        </userContext.Provider>
    );
};

export default UserState;
