import {login, logout} from "../actions/userAction";
import {LOGIN, LOGOUT} from "../actions/types";

const defaultState = {
    token: '',
    user: {},
    isAuth: false
}


export default function(state=defaultState, action){
    switch (action.type){
        case LOGIN:{
            const {payload:data} = action
            return{
                ...state,
                token: data.token,
                user: data.user,
                isAuth: true,
            }
        }
        case LOGOUT:{
            console.log("logout")
            return {
                ...state,
                token: '',
                user: '',
                isAuth: false
            }
        }

        default:
            return state

    }
}