import {login, logout} from "../actions/userAction";
import {CURSOR, LOGIN, LOGOUT, UPDATE} from "../actions/types";

const defaultState = {
    token: '',
    user: {},
    isAuth: false,
    cursor: '',
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
                cursor: '',

            }
        }
        case UPDATE:{
            const {payload:data} = action
            return{
                ...state,
                user: data,
                isAuth:true,
                cursor: '',

            }
        }
        case LOGOUT:{
            return {
                ...state,
                token: '',
                user: '',
                isAuth: false,
                cursor: '',

            }
        }
        case CURSOR:{
            const {payload:data} = action
            console.log(data)
            return{
                ...state,
                cursor: data
            }
        }
        default:
            return state
    }
}