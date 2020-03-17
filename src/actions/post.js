import { GET_POSTS, POST_ERROR, DELETE_POST, ADD_POST, GET_POST } from './types';
import { setAlert } from './alert';
import axios from 'axios';


export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

export const addLike = (id) => async dispatch => {
    try {
        await axios.put(`/api/posts/${id}/like`);
    } catch (error) {
        dispatch(setAlert('Error', 'danger'))
    }
}

export const removeLike = (id) => async dispatch => {
    try {
        await axios.put(`/api/posts/${id}/removelike`);
    } catch (error) {
        dispatch(setAlert('Error', 'danger'))
    }
}

export const deletePost = (id) => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id
        })
        dispatch(setAlert('Post Delete', 'danger'))
    } catch (error) {
        dispatch(setAlert('Error', 'danger'))
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}


export const addPost = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    const formDataHtml = new FormData();

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (validImageTypes.includes(formData.file['type'])) {
        formDataHtml.append('photo', formData.file)
    }
    else {
        formDataHtml.append('video', formData.file)
    }
    formDataHtml.append('text', formData.text)

    try {

        const res = await axios.post('/api/posts', formDataHtml, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('Post Added', 'success'))
    } catch (error) {
        dispatch(setAlert('Error', 'danger'))
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        await axios.put(
            `/api/posts/${postId}/addcomment`,
            formData,
            config
        );

        dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
        dispatch(setAlert('Error', 'danger'))
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete comment
export const deleteComment = (commentId) => async dispatch => {
    try {
        await axios.put(`/api/posts/removecomment/${commentId}`);

        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch(setAlert('Error', 'danger'))
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};