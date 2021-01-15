import React from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {logout} from "../../actions/userAction";

export default function Profile() {
    const history = useHistory()
    const dispatch = useDispatch()
    const onLogout = dispatch(logout())

    const fn = () => {
        onLogout()
        history.push('/')
    }

    return  <div>
        <button onClick={() =>fn}>로그아웃</button>
    </div>
}