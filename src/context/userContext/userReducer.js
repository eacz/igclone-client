import { LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT } from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state, loading: true};
        case LOGIN_SUCCESS:
            return {...state, loading: false, token: action.payload.token, user: action.payload.user, error: null, auth: true}
        case LOGIN_FAILED:
            return {...state, loading: false, token: null, user: null, error: action.payload, auth: false}
        case LOGOUT:
            return {...state, loading:false, token: null, user: null, error: null, auth: false}
        default:
            return state;
    }
};
