import React, {useState} from 'react'
import Layout from "../../../components/Layout";
import {axiosInstance} from "../../../utils/axios";
import {notification} from "antd";

export default function AccountSetting(props) {
    const init = {
        old_password: '',
        new_password1: '',
        new_password2: '',
    }
    let [password, setPassword] = useState(init)

    const onEdit = async(e) => {
        e.preventDefault()
        try {
            const res = await axiosInstance.post('rest-auth/password/change/', password)
            console.log(res)
            notification.open({
                message: "변경되었습니다."
            })
            window.location.reload()
        }
        catch (error){
            console.log(error.response)
            const {data: ErrorMessages} = error.response
            notification.open({
                description: Object.entries(ErrorMessages).reduce(
                    (acc,[fieldName, err]) => {
                        acc += err
                        console.log(acc)
                        return acc
                    }
                ),
            })
        }
    }

    const updatePassword = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }
    return  (
        <Layout props={props}>
            <div className="max-w-screen-sm mx-auto">
                <h1 className="text-3xl font-bold">계정 설정</h1>
                <p>로그인 환경을 설정하면 맞춤형 서비스를 제공하는 데 도움이 됩니다. 여기에서 계정을 크게 달라지게 할 수 있습니다.</p>
                <form onSubmit={onEdit}>
                    <div className="flex">
                        <button type={"submit"} className="px-4 py-2 rounded-3xl ml-auto font-bold" style={{backgroundColor:"#EFEFEF", color:"#000000"}}>완료</button>
                        <button type={"button"} className="px-4 py-2 rounded-3xl ml-4 font-bold" style={{backgroundColor:"#EFEFEF", color:"#000000"}}>취소</button>
                    </div>
                    <div>
                        <div>
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
