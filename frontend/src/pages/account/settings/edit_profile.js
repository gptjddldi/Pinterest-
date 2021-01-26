import React from 'react'
import {useSelector} from "react-redux";

export default function ProfileEdit() {
    let {user} = useSelector(state => ({
        user: state.userReducer.user
    }))
    return <div>Profile Setting</div>

}