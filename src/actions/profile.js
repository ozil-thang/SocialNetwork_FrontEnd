import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, DELETE_ACCOUNT, GET_PROFILES, GET_REPOS } from './types'
import axios from 'axios'
import { setAlert } from './alert';

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profiles/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}


export const getProfiles = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_PROFILE
        })
        const res = await axios.get('/api/profiles');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profiles/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

export const getGithubRepos = username => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        const formDataHtml = new FormData();

        formDataHtml.append('displayName', formData.displayName)
        formDataHtml.append('company', formData.company)
        formDataHtml.append('website', formData.website)
        formDataHtml.append('location', formData.location)
        formDataHtml.append('status', formData.status)
        formDataHtml.append('skills', formData.skills)
        formDataHtml.append('githubUserName', formData.githubUserName)
        formDataHtml.append('bio', formData.bio)
        formDataHtml.append('avatar', formData.avatar)
        formDataHtml.append('twitter', formData.twitter)
        formDataHtml.append('facebook', formData.facebook)
        formDataHtml.append('linkedin', formData.linkedin)
        formDataHtml.append('youtube', formData.youtube)
        formDataHtml.append('instagram', formData.instagram)


        const res = await axios.post(`/api/profiles?edit=${edit}`, formDataHtml, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        if (edit) {
            dispatch(setAlert('Profile updated', 'success'))
        }
        else {
            dispatch(setAlert('Profile created successfully', 'success'))
            history.push('/dashboard')
        }

    } catch (error) {
        if (edit) {
            dispatch(setAlert('Update Fail', 'danger'))
        }
        else {
            dispatch(setAlert('Create Fail', 'danger'))
        }
    }
}




export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(formData)
        await axios.post('/api/profiles/experience', body, config);

        dispatch(setAlert('Experience Added', 'success'))
        history.push('/dashboard');
    } catch (error) {
        dispatch(setAlert('Add Fail', 'danger'))
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}


export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(formData)
        await axios.post('/api/profiles/education', body, config);

        dispatch(setAlert('Education Added', 'success'))
        history.push('/dashboard');
    } catch (error) {
        dispatch(setAlert('Add Fail', 'danger'))
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

export const deleteExperience = (exp_id) => async dispatch => {
    try {
        await axios.delete(`/api/profiles/experience/${exp_id}`);
        dispatch(getCurrentProfile());
        dispatch(setAlert('Experience Deleted', 'danger'))
    } catch (error) {
        dispatch(setAlert('Delete Fail', 'danger'))
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}


export const deleteEducation = (edu_id) => async dispatch => {
    try {
        await axios.delete(`/api/profiles/education/${edu_id}`);

        dispatch(getCurrentProfile());
        dispatch(setAlert('Education Deleted', 'success'))
    } catch (error) {
        dispatch(setAlert('Delete Fail', 'danger'))
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            await axios.delete('/api/profile');
            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: DELETE_ACCOUNT });

            dispatch(setAlert('Your account has been permanatly deleted'));
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }
    }
}