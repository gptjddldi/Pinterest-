import React, {useRef, useState} from 'react'
import axios from "axios";
import {useSelector} from "react-redux";
import Layout from "../components/Layout";
import ProfilePicture from "../components/ProfilePicture";

const apiRoot = 'http://localhost:8000/account/user/kakao/'
export default function CssTest() {
    let [username, setUsername] = useState()
    let [avatar, setAvatar] = useState()
    let imageInput = useRef()
    const {token, user} = useSelector(state => ({
        token: state.userReducer.token,
        user: state.userReducer.user,
    }))

    const onEdit = (e) => {
        e.preventDefault()
        async function fn() {
            const data = {username, avatar}
            const headers = {Authorization: `JWT ${token}`}
            const response = axios.put(apiRoot, data, {headers})
            console.log(response)
        }
        fn()
    }
    const handleChange = (e) => {
        setAvatar(e.target.files[0])
    }
    return  (
        <Layout>
            <div className="max-w-screen-sm mx-auto">
                <h1 className="text-3xl font-bold">프로필 수정</h1>
                <p>Pinterest 사용자들이 아래 정보로 회원님을 파악하게 됩니다.</p>
                <form onSubmit={onEdit}>
                    <div className="flex">
                        <button className="px-4 py-2 rounded-3xl ml-auto font-bold" style={{backgroundColor:"#EFEFEF", color:"#000000"}}>완료</button>
                        <button className="px-4 py-2 rounded-3xl ml-4 font-bold" style={{backgroundColor:"#EFEFEF", color:"#000000"}}>취소</button>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="">사진</label>
                            <div className="flex items-center">
                                {avatar ? (
                                    <img className="rounded-full w-20 h-20" src={URL.createObjectURL(avatar)}/>
                                ) : (
                                    <ProfilePicture user={user} size="3"/>
                                )}
                                <button className="px-4 py-2 rounded-3xl ml-4 font-bold" style={{backgroundColor:"#EFEFEF", color:"#000000"}} onClick={() => imageInput.current.click()}>변경</button>
                                <input ref={imageInput} type="file" className={"hidden"} onChange={handleChange}/>
                            </div>
                            <div className="flex">
                                <input type="text" label="username" placeholder="Ex. Jo Smith" value={username} onChange={e => setUsername(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}