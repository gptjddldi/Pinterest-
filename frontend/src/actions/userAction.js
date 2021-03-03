import {LOGIN, SIGNUP, LOGOUT, UPDATE, CURSOR} from './types'

export const login = (data) => ({ type:LOGIN, payload: data})
export const logout = () => ({type: LOGOUT})
export const update = (data) => ({type:UPDATE, payload:data})

export const cursor = (data) => ({type:CURSOR, payload:data})