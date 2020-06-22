import {IS_AUTHENTICATED} from './authTypes';

const initial_state = {
    isAuthenticated: ''
}

const authReducer = (state = initial_state, action) =>{
    switch(action.type){
        case IS_AUTHENTICATED: return {
            ...state,
            isAuthenticated: action.payload
        }
        default:
            return state
    }
}

export default authReducer