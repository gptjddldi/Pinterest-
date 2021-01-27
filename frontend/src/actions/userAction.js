import {LOGIN, SIGNUP, LOGOUT, UPDATE} from './types'

export const login = (data) => ({ type:LOGIN, payload: data})
export const logout = () => ({type: LOGOUT})
export const update = (data) => ({type:UPDATE, payload:data})

