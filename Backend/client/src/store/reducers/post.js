import * as actionTypes from '../actions/actionTypes';

const initialState = {
    post: null,
    posts: [],
    loading: true,
    error: {}
};

const postReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case actionTypes.GET_ALL_POSTS_FAIL:
        case actionTypes.GET_SINGLE_POST_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case actionTypes.GET_ALL_POSTS_SUCCESS:
            return {
                ...state,
                posts: payload.posts,
                loading: false
            }
        case actionTypes.GET_SINGLE_POST_SUCCESS:
            return {
                ...state,
                post: payload.post,
                loading: false
            }
        case actionTypes.LIKE_A_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if(post._id === payload.post_id) {
                        post.likes.unshift({user: payload.req_user_id});
                    }
                    return post;
                }),
                loading: false
            }
        case actionTypes.UNLIKE_POST_SUCCESS: 
            return {
                ...state,
                posts: state.posts.map(post => {
                    if(post._id === payload.post_id) {
                        return {
                            ...post,
                            likes: post.likes.filter(like => like.user !== payload.req_user_id)
                        }
                    }
                    return post;
                }),
                loading: false
            }
        case actionTypes.CREATE_POST_SUCCESS:
            return {
                ...state,
                posts: [payload.post, ...state.posts],
                loading: false
            }
        case actionTypes.DELETE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload.post_id),
                loading: false
            }
        case actionTypes.ADD_COMMENT_SUCCESS: 
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [...state.post.comments, payload.comment]
                },
                loading: false 
            }
        case actionTypes.DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(comment => comment._id !== payload.comment_id)
                },
                loading: false
            }

            default: return state;
    }
}

export default postReducer;