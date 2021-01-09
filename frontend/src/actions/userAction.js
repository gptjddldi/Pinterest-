import {LOGIN, SIGNUP, LOGOUT} from './types'

export const login = (data) => ({ type:LOGIN, payload: data})
export const logout = () => ({type: LOGOUT})

