import * as actionTypes from './actionTypes';
import * as actions from './index';
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

const profileCreateStart = () => {
    return {
        type: actionTypes.PROFILE_CREATE_START
    }
}

const profileCreateFail = (err) => {
    return {
        type: actionTypes.PROFILE_CREATE_FAIL,
        payload: {
            msg: err.msg,
            status: err.status
        }
    }
}

const profileCreateSuccess = (profile) => {
    return {
        type: actionTypes.PROFILE_CREATE_FAIL,
        payload: {
            profile
        }
    }
}

export const profileCreate = (data, history, edit = false) => {
    return async dispatch => {
    dispatch(profileCreateStart());
        
        const body = data; 

            try {
                const res = await axios.post('/api/profile', body, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if(!edit) {
                    history.push('/dashboard');
                }

                dispatch(actions.setAlert(edit ? 'Profile Updated!' : 'Profile Created', 'success'));
                dispatch(profileCreateSuccess(res.data));
            } catch (err) {
                const errors = err.response.data.errors;
                if(errors) errors.forEach(error => dispatch(actions.setAlert(error.msg, 'danger')));
                dispatch(profileCreateFail({ msg: err.response.data.msg, status: err.response.status}));
            }
    }
}

const addExperienceProfileStartAction = () => {
    return {
        type: actionTypes.ADD_EXPERIENCE_PROFILE_START
    }
}

const addExperienceProfileFailAction = (err) => {
    return {
        type: actionTypes.ADD_EXPERIENCE_PROFILE_FAIL,
        payload: {
            msg: err.msg,
            status: err.status
        }
    }
}

const addExperienceProfileSuccessAction = (profile) => {
    return {
        type: actionTypes.ADD_EXPERIENCE_PROFILE_SUCCESS,
        payload: {
            profile
        }
    }
}

export const addExperienceProfile = (data, history) => {
    return async dispatch => {
        dispatch(addExperienceProfileStartAction());
        const body = data;

        try {
            const res = await axios.put('/api/profile/experience', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            history.push('/dashboard');
            dispatch(actions.setAlert('Experience added', 'success'));
            dispatch(addExperienceProfileSuccessAction(res.data));
        } catch (err) {
            const errors = err.response.data.errors;
            if(errors) errors.forEach(error => dispatch(actions.setAlert(error.msg, 'danger')));

            dispatch(addExperienceProfileFailAction({msg: err.response.data.msg, status: err.response.status}));
        }
    }
}

const addEducationProfileStartAction = () => {
    return {
        type: actionTypes.ADD_EDUCATION_PROFILE_START
    }
}

const addEducationProfileFailAction = (err) => {
    return {
        type: actionTypes.ADD_EDUCATION_PROFILE_FAIL,
        payload: {
            msg: err.msg,
            status: err.status
        }
    }
}

const addEducationProfileSuccessAction = (profile) => {
    return {
        type: actionTypes.ADD_EDUCATION_PROFILE_SUCCESS,
        payload: {
            profile
        }
    }
}

export const addEducationProfile = (data, history) => {
    return async dispatch => {
        dispatch(addEducationProfileStartAction());
        const body = data;
        try {
            const res = await axios.put('/api/profile/education', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            history.push('/dashboard');
            dispatch(actions.setAlert('Education added', 'success'));
            dispatch(addEducationProfileSuccessAction(res.data));
        } catch (err) {
            const errors = err.response.data.errors;
            if(errors) errors.forEach(error => dispatch(actions.setAlert(error.msg, 'danger')));
            dispatch(addEducationProfileFailAction({msg: err.response.data.msg, status: err.response.status}));
        }
    }
}

const deleteExperienceFailAction = ({ msg, status}) => {
    return {
        type: actionTypes.DELETE_EXPERIENCE_FAIL,
        payload: {
            msg, 
            status
        }
    }
}

const deleteExperienceSuccessAction = (id) => {
    return {
        type: actionTypes.DELETE_EXPERIENCE_SUCCESS,
        payload: {
            id
        }
    }
}

export const deleteExperience = (id) => {
    return async dispatch => {
        try {
            const res = await axios.delete(`/api/profile/experience/${id}`);

            dispatch(actions.setAlert(res.data.msg, 'success'));
            dispatch(deleteExperienceSuccessAction(id));
        } catch (err) {
            console.log(err);
            dispatch(actions.setAlert(`Can't delete experience at the moment. Server Error!`, 'danger'));
            dispatch(deleteExperienceFailAction({ msg: err.response.statusText, status: err.response.status}))
        }
    }
}

const deleteEducationFailAction = ({ msg, status}) => {
    return {
        type: actionTypes.DELETE_EDUCATION_FAIL,
        payload: {
            msg, 
            status
        }
    }
}

const deleteEducationSuccessAction = (id) => {
    return {
        type: actionTypes.DELETE_EDUCATION_SUCCESS,
        payload: {
            id
        }
    }
}

export const deleteEducation = (id) => {
    return async dispatch => {
        try {
            const res = await axios.delete(`/api/profile/education/${id}`);

            dispatch(actions.setAlert(res.data.msg, 'success'));
            dispatch(deleteEducationSuccessAction(id));
        } catch (err) {
            console.log(err);
            dispatch(actions.setAlert(`Can't delete education at the moment. Server Error!`, 'danger'));
            dispatch(deleteEducationFailAction({ msg: err.response.statusText, status: err.response.status}))
        }
    }
}