import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {update} from "../../../actions/userAction";
import Layout from "../../../components/Layout";
import ProfilePicture from "../../../components/ProfilePicture";
import {axiosInstance} from "../../../utils/axios";

export default function ProfileEdit(props) {

    let [avatar, setAvatar] = useState(undefined)
    let imageInput = useRef()
    const {user} = useSelector(state => ({
        user: state.userReducer.user,
    }))
    let [username, setUsername] = useState(user.username)

    const dispatch = useDispatch()
    const onUpdate = (data) => dispatch(update(data));

    const onEdit = (e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append("username", username)
        if(avatar === undefined)
            ;
        else
            fd.append("avatar", avatar)
        fd.append("email", user.email)
        axiosInstance.patch(`rest-auth/user/`, fd).then((res  ) => {
            const data = res.data;
            onUpdate(data)
        })
            .catch((e)=>console.log(e.response))
    }
    const handleChange = (e) => {
        setAvatar(e.target.files[0])
    }
    return  (
        <Layout props={props}>
            <div className="max-w-screen-sm mx-auto">
                <h1 className="text-3xl font-bold">프로필 수정</h1>
                <p>Pinterest 사용자들이 아래 정보로 회원님을 파악하게 됩니다.</p>
                <form onSubmit={onEdit}>
                    <div className="flex">
                        <button type={"submit"} className="px-4 py-2 rounded-3xl ml-auto font-bold" style={{backgroundColor:"#EFEFEF", color:"#000000"}}>완료</button>
                        <button type={"button"} className="px-4 py-2 rounded-3xl ml-4 font-bold" style={{backgroundColor:"#EFEFEF", color:"#000000"}}>취소</button>
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
                                <button type={"button"} className="px-4 py-2 rounded-3xl ml-4 font-bold" style={{backgroundColor:"#EFEFEF", color:"#000000"}} onClick={() => imageInput.current.click()}>프로필 이미지 변경</button>
                                <input ref={imageInput} type="file" className={"hidden"} onChange={handleChange}/>
                            </div>
                            사용자 이름
                            <div className="flex">
                                <input type="text" className="block w-64 rounded-xl border-2 border-gray-300 px-4 py-2 my-2" label="username" value={username} onChange={e => setUsername(e.target.value)} />
                            </div>
                            http://localhost:3000/profile/{username}
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}