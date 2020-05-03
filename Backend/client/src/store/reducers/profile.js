import * as actionTypes from '../actions/actionTypes';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: false,
    error: {}
};

const profileReducer = ( state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case actionTypes.PROFILE_FETCH_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PROFILE_FETCH_SUCCESS:
            return {
                ...state,
                profile: payload.profile,
                loading: false
            }
        case actionTypes.PROFILE_FETCH_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            }
        
        default: return state;
    }
};

export default profileReducer;