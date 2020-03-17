import { SET_ONLINEUSER } from '../actions/types'

const initialState = {
    users: []
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ONLINEUSER:
            return {
                ...state,
                users: payload
            }
        default:
            return state;
    }
}