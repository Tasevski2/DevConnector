import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: null,
    user: null
};

const authReducer = (state = initialState, action) => {
    const { type, payload} = action;
    switch(type) {
        case actionTypes.LOAD_USER_SUCCESS: 
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user
            }
        case actionTypes.REGISTER_START: 
        case actionTypes.LOGIN_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                loading: false
            } 
        case actionTypes.REGISTER_FAIL: 
        case actionTypes.LOAD_USER_FAIL:
        case actionTypes.LOGIN_FAIL:
        case actionTypes.LOGOUT:
        case actionTypes.DELETE_ACCOUNT_SUCCESS:
            localStorage.clear();
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        default: return state;
    }
}

export default authReducer;