import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {update} from "../../../actions/userAction";
import axios from "axios";
import Layout from "../../../components/Layout";
import ProfilePicture from "../../../components/ProfilePicture";

export default function AccountSetting() {
    const init = {
        old_password: '',
        new_password1: '',
        new_password2: '',
    }
    const {token, user} = useSelector(state => ({
        token: state.userReducer.token,
        user: state.userReducer.user,
    }))
    let [email, setEmail] = useState(user.email)
    let [password, setPassword] = useState(init)
    const dispatch = useDispatch()
    const onUpdate = (data) => dispatch(update(data));
    const apiRoot = `http://localhost:8000/account/user/${user.username}/`
    const passChangeRoot = 'http://localhost:8000/account/password_change/'
    const headers = {Authorization: `JWT ${token}`}

    const onEdit = (e) => {
        e.preventDefault()
        async function fn() {
            const fd = new FormData()
            fd.append("email", email)
            fd.append("username", user.username)
            // const data = {username, avatar}
            const response = await axios.put(apiRoot, fd, {headers})
            const data = response.data
            onUpdate(data)
        }
        async function fn2() {
            console.log(password)
            const response = await axios.put(passChangeRoot, password, {headers})
            const data = response.data
            console.log(data)
            onUpdate(data)
        }
        // fn()
        if (password !== init) fn2()
    }

    const updatePassword = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }
    return  (
        <Layout>
            <div className="max-w-screen-sm mx-auto">
                <h1 className="text-3xl font-bold">계정 설정</h1>
                <p>로그인 환경을 설정하면 맞춤형 서비스를 제공하는 데 도움이 됩니다. 여기에서 계정을 크게 달라지게 할 수 있습니다.</p>
                <form onSubmit={onEdit}>
                    <div className="flex">
                        <button className="px-4 py-2 rounded-3xl ml-auto font-bold" style={{backgroundColor:"#EFEFEF", color:"#000000"}}>완료</button>
                        <button className="px-4 py-2 rounded-3xl ml-4 font-bold" style={{backgroundColor:"#EFEFEF", color:"#000000"}}>취소</button>
                    </div>
                    <div>
                        <div>
                            이메일 주소
                            <div className="flex">
                                <input type="text" className="block w-64 rounded-xl border-2 border-gray-300 px-4 py-2 my-2" label="username" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div>
                                비밀번호 변경
                                <div className="flex">
                                    <input type="password" className="block w-64 rounded-xl border-2 border-gray-300 px-4 py-2 my-2" label="username" name="old_password" placeholder="기존 비밀번호" value={password.old_password} onChange={updatePassword} />
                                </div>
                                <div className="flex">
                                    <input type="password" className="block w-64 rounded-xl border-2 border-gray-300 px-4 py-2 my-2" label="username" name="new_password1" placeholder="새 비밀번호" value={password.new_password1} onChange={updatePassword}/>
                                </div>
                                <div className='flex'>
                                    <input type="password" className="block w-64 rounded-xl border-2 border-gray-300 px-4 py-2 my-2" label="username" name="new_password2" placeholder="다시 입력" value={password.new_password2} onChange={updatePassword} />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
