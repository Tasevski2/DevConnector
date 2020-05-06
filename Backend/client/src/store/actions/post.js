import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as actions from './index';

const getAllPostsSuccessAction = (posts) => {
    return {
        type: actionTypes.GET_ALL_POSTS_SUCCESS,
        payload: {
            posts
        }
    }
}

const getAllPostsFailAction = (err) => {
    return {
        type: actionTypes.GET_ALL_POSTS_FAIL,
        payload: err
    }
}

export const getAllPosts = () => {
    return async dispatch => {
        try {
            const res = await axios.get('/api/posts');

            dispatch(getAllPostsSuccessAction(res.data.posts));
        } catch (err) {
            dispatch(getAllPostsFailAction(err));
        }
    }
}

const getSinglePostSuccessAction = (post) => {
    return {
        type: actionTypes.GET_SINGLE_POST_SUCCESS,
        payload: {
            post
        }
    }
}

const getSinglePostFailAction = (err) => {
    return {
        type: actionTypes.GET_SINGLE_POST_FAIL,
        payload: err
    }
}

export const getSinglePost = (id) => {
    return async dispatch => {
        try {
            const res = await axios.get(`/api/posts/${id}`);

            dispatch(getSinglePostSuccessAction(res.data.post));
        } catch (err) {
            dispatch(getSinglePostFailAction(err.response));
        }
    }
}

const likeAPostSuccessAction = (req_user_id, post_id) => {
    return {
        type: actionTypes.LIKE_A_POST_SUCCESS,
        payload: {
            req_user_id,
            post_id
        }
    }
}

// const likeAPostFailAction = (msg) => {
//     return {
//         type: actionTypes.LIKE_A_POST_FAIL,
//         payload: {
//             msg
//         }
//     }
// }

export const likeAPost = (post_id) => {
    return async dispatch => {
        console.log(post_id);
        try {
            const res = await axios.put(`/api/posts/like/${post_id}`);
            dispatch(actions.setAlert('Post liked!', 'success'));
            dispatch(likeAPostSuccessAction(res.data,post_id));        
        } catch (err) {
            if(err.response.data) dispatch(actions.setAlert(err.response.data.msg, 'danger'));
            console.log(err.response);
        }
    }
}

const unlikePostSuccessAction = (req_user_id, post_id) => {
    return {
        type: actionTypes.UNLIKE_POST_SUCCESS,
        payload: {
            req_user_id,
            post_id
        }
    }
}

export const unlikePost = (post_id) => {
    return async dispatch => {
        try {
            const res = await axios.delete(`/api/posts/unlike/${post_id}`);
            dispatch(actions.setAlert('Post unliked!', 'success'));
            dispatch(unlikePostSuccessAction(res.data, post_id));
        } catch (err) {
            if(err) dispatch(actions.setAlert(err.response.data.msg, 'danger'));
            console.log(err);
        }
    }
}

const deletePostSuccessAction = (post_id) => {
    return {
        type: actionTypes.DELETE_POST_SUCCESS,
        payload: {
            post_id
        }
    }
}

export const deletePost = (id) => {
    return async dispatch => {
        try {
            await axios.delete(`/api/posts/${id}`);
            dispatch(actions.setAlert('Post deleted', 'success'));
            dispatch(deletePostSuccessAction(id));
        } catch (err) {
            dispatch(actions.setAlert(err.response.statusText, 'danger'));
        }
    }
}

const createPostSuccessAction = (post) => {
    return {
        type: actionTypes.CREATE_POST_SUCCESS,
        payload: {
            post
        }
    }
}

export const createPost = (text) => {
    return async dispatch => {
        const body = {
            text
        };
        try {
            const res = await axios.post('/api/posts', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data);
            dispatch(actions.setAlert('Post created!', 'success'));
            dispatch(createPostSuccessAction(res.data));
        } catch (err) {
            dispatch(actions.setAlert('Could not create the post. Server error!', 'danger'));
            console.log(err);
        }
    }
}

const addCommentSuccessAction = (comment) => {
    return {
        type: actionTypes.ADD_COMMENT_SUCCESS,
        payload: {
            comment
        }
    }
}

export const addComment = (text, post_id) => {
    return async dispatch => {
        const body = {
            text
        };
        try {
            const res = await axios.put(`/api/posts/comment/${post_id}`, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch(actions.setAlert('Post added!', 'success'));
            dispatch(addCommentSuccessAction(res.data));
        } catch (err) {
            console.log(err);
            dispatch(actions.setAlert('Can\'t comment on the post right now. Server error!', 'danger'));
        }
    }   
}

const deleteCommentSuccessAction = (comment_id) => {
    return {
        type: actionTypes.DELETE_COMMENT_SUCCESS,
        payload: {
            comment_id
        }
    }
}

export const deleteComment = (post_id, comment_id, ) => {
    return async dispatch => {
        try {
            console.log("Post id: " + post_id + " Comment id: " + comment_id);
            await axios.delete(`/api/posts/comment/${post_id}/${comment_id}`);
            dispatch(actions.setAlert('Comment deleted!', 'success'));
            dispatch(deleteCommentSuccessAction(comment_id));
        } catch (err) {
            console.log(err.response);
            dispatch(actions.setAlert("Can\'t delete the comment right now. Server error!", 'danger'));
        }
    }
}