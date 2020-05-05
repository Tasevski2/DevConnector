import * as actionTypes from '../actions/actionTypes';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: false,
    error: {}
};

const profileReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.PROFILE_FETCH_START:
        case actionTypes.PROFILE_CREATE_START:
        case actionTypes.ADD_EXPERIENCE_PROFILE_START:
        case actionTypes.ADD_EDUCATION_PROFILE_START:
        case actionTypes.GET_ALL_PROFILES_START:
        case actionTypes.GET_PROFILE_BY_ID_START:
        case actionTypes.GET_REPOS_BY_USERNAME_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PROFILE_FETCH_SUCCESS:
        case actionTypes.PROFILE_CREATE_SUCCESS:
        case actionTypes.ADD_EXPERIENCE_PROFILE_SUCCESS:
        case actionTypes.ADD_EDUCATION_PROFILE_SUCCESS:
        case actionTypes.GET_PROFILE_BY_ID_SUCCESS:
            return {
                ...state,
                profile: payload.profile,
                loading: false
            }
        case actionTypes.GET_ALL_PROFILES_SUCCESS:
            return {
                ...state,
                profiles: payload.profiles,
                loading: false
            }
        case actionTypes.GET_REPOS_BY_USERNAME_SUCCESS:
            return {
                ...state,
                repos: payload.repos,
                loading: false
            }
        case actionTypes.PROFILE_FETCH_FAIL:
        case actionTypes.PROFILE_CREATE_FAIL:
        case actionTypes.GET_ALL_PROFILES_FAIL:
        case actionTypes.ADD_EXPERIENCE_PROFILE_FAIL:
        case actionTypes.ADD_EDUCATION_PROFILE_FAIL:
        case actionTypes.GET_PROFILE_BY_ID_FAIL:
        case actionTypes.GET_REPOS_BY_USERNAME_FAIL:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            }
        case actionTypes.DELETE_PROFILE_LOGOUT:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        case actionTypes.DELETE_EXPERIENCE_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    experience: state.profile.experience.filter(exp => exp._id !== payload.id)
                }
            }
        case actionTypes.DELETE_EDUCATION_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    education: state.profile.education.filter(edu => edu._id !== payload.id)
                }
            }
        case actionTypes.DELETE_ACCOUNT_SUCCESS:
            return {
                profile: null,
                profiles: [],
                repos: [],
                loading: false,
                error: {}
            }
        default: return state;
    }
};

export default profileReducer;