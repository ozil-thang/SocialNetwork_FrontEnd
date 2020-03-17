import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_PROFILE,
    SET_ONLINEUSER
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { HubConnectionBuilder } from '@aspnet/signalr'

export const loadUser = () => async dispatch => {

    //await wait(5000)
    if (localStorage.token) {
        setAuthToken(localStorage.token)

        const onlineUserHubConnection = new HubConnectionBuilder().withUrl("http://localhost:5000/onlineUserHub", { accessTokenFactory: () => localStorage.token }).build();

        onlineUserHubConnection.on("onlineUser", onlineUser => {
            console.log('onlineUser: ', onlineUser);
            dispatch({
                type: SET_ONLINEUSER,
                payload: onlineUser
            })
        })

        onlineUserHubConnection.start().then(() => {
            console.log('onlineUserHub start');
        }).catch(err => console.log(err));

        window.onbeforeunload = function () {
            onlineUserHubConnection.stop();
            return 'hello';
        };

    }
    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}



export const register = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post('/api/auth/register', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser());
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        })
        dispatch(setAlert('Register Fail', 'danger'))
    }
}


export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post('/api/auth/login', body, config);

        console.log("token: ", res.data.token)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
        dispatch(setAlert('Login fail', 'danger'))
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })
    dispatch({
        type: LOGOUT
    })
}
