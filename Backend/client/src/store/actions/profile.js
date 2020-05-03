import * as actionTypes from './actionTypes';
import axios from 'axios';

const profileFetchFailAction = (err) => {
    return {
        type: actionTypes.PROFILE_FETCH_FAIL,
        payload: {
            err_msg: err.msg,
            err_status: err.status
        }
    }
}


const profileFetchSuccessAction = (profile) => {
    return {
        type: actionTypes.PROFILE_FETCH_SUCCESS,
        payload: {
            profile
        }
    }
}

const profileFetchStartAction = () => {
    return {
        type: actionTypes.PROFILE_FETCH_START
    }
}

export const profileFetch = () => {
    return async dispatch => {
        dispatch(profileFetchStartAction());
        try {
            const res = await axios.get('/api/profile/me');
            dispatch(profileFetchSuccessAction(res.data.profile));
        } catch (err) {
            dispatch(profileFetchFailAction({ msg: err.response.data.msg, status: err.response.status}));
        }
    }
}