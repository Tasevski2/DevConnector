import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as actions from './index';
import setAuthToken from '../../utilities/setAuthToken';

const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    }
};

const registerSuccess = (token) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        payload: {
            token
        }
    }
};

const registerFail = () => {
    return {
        type: actionTypes.REGISTER_FAIL
    }
};

export const register = (name, email, password) => {
    return async dispatch => {
        dispatch(registerStart());
        const body = JSON.stringify({ name, email, password });

        try {
            const res = await axios.post('/api/users', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch(registerSuccess(res.data.token));
            dispatch(loadUser());
        } catch (err) {
            const errors = err.response.data.errors;
            if (errors) errors.forEach(error => {
                dispatch(actions.setAlert(error.msg, 'danger'));
            });
            dispatch(registerFail());
        }
    }
};

const loadUserSuccessAction = (user) => {
    return {
        type: actionTypes.LOAD_USER_SUCCESS,
        payload: {
            user
        }
    }
}

const loadUserFailAction = () => {
    return {
        type: actionTypes.LOAD_USER_FAIL
    }
}

export const loadUser = () => {
    return async dispatch => {
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth');

            dispatch(loadUserSuccessAction(res.data));
        } catch (err) {
            dispatch(loadUserFailAction());
        }
    }
}

const loginStartAction = () => {
    return {
        type: actionTypes.LOGIN_START
    }
}

const loginSuccessAction = (token) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
            token
        }
    }
}

const loginFailAction = () => {
    return {
        type: actionTypes.LOGIN_FAIL
    }
}

export const login = (email, password) => {
    return async dispatch => {
        dispatch(loginStartAction());
        const body = JSON.stringify({ email, password });

        try {
            const res = await axios.post('/api/auth', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch(loginSuccessAction(res.data.token));
            dispatch(loadUser());
        } catch (err) {
            const errors = err.response.data.errors;
            if(errors) errors.forEach(error => 
                dispatch(actions.setAlert(error.msg, 'danger')));
            dispatch(loginFailAction());
        }
    }
}

const logoutAction = () => {
    return {
        type: actionTypes.LOGOUT
    }
}

const deleteProfileLogoutAction = () => {
    return {
        type: actionTypes.DELETE_PROFILE_LOGOUT
    }
}

export const logout = () => {
    return dispatch => {
        dispatch(deleteProfileLogoutAction());
        dispatch(logoutAction());
    }
}

const deleteAccountFail = () => {
    return {
        type: actionTypes.DELETE_ACCOUNT_FAIL
    }
}

const deleteAccountSuccess = () => {
    return {
        type: actionTypes.DELETE_ACCOUNT_SUCCESS
    }
}

export const deleteAccount = () => {
    return async dispatch => {
        if(window.confirm('Are you sure about deleting your account?')) {
            try {
                const res = await axios.delete('/api/profile');
                dispatch(deleteAccountSuccess());
                dispatch(actions.setAlert('Your account has been permanently deleted!', 'danger'));
            } catch (err) {
                dispatch(actions.setAlert('Something went wrong!', 'danger'));
            }
        }
    }
}