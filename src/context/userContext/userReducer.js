import {
    LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT,
    UPDATE_PROFILE_INFO,
    UPDATE_USER,
    UPDATE_USER_LIST,
} from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, loading: true };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                user: action.payload.user,
                error: null,
                auth: true,
            };
        case LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                token: null,
                user: null,
                error: action.payload,
                auth: false,
            };
        case LOGOUT:
            return {
                ...state,
                loading: false,
                token: null,
                user: null,
                error: null,
                auth: false,
            };
        case UPDATE_USER:
            return { ...state, user: {...state.user, following: action.payload.following}  };
        case UPDATE_PROFILE_INFO: 
            return {...state, user: {...state.user, description: action.payload.description, name: action.payload.name}}
        case UPDATE_USER_LIST:
            return {...state, listUserToDisplay: action.payload}
        default:
            return state;
    }
};
