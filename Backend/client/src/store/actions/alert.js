import * as actionTypes from './actionTypes';
import { v4 as uuidv4 } from 'uuid';

const setAlertAction = (msg, alertType, id) => {
    return {
        type: actionTypes.SET_ALERT,
        payload: {
            msg,
            alertType,
            id
        }
    }
};

const removeAlertAction = (id) => {
    return {
        type: actionTypes.REMOVE_ALERT,
        payload: {
            id
        }
    }
};

export const setAlert = (msg, alertType) => {
    return dispatch => {
        const id = uuidv4();
        dispatch(setAlertAction(msg, alertType, id));
        setTimeout(() => {
            dispatch(removeAlertAction(id));
        }, 3000)
    }
}