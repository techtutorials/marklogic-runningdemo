import {IS_AUTHENTICATED} from './authTypes'

export const isAuthenticated = (jwtToken)=>{
    return {
        type: IS_AUTHENTICATED,
        payload: jwtToken
    }
}