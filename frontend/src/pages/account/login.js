import React, {useState} from 'react'
import {Button, Form, Input, Modal} from "antd";
import {useDispatch} from "react-redux";
import {login} from "../../actions/userAction";
import Axios from "axios";
import {Link, useHistory, useLocation} from "react-router-dom";


const loginStyle = {
    'background': "url('http://bit.ly/2gPLxZ4')",
    'background-repeat': "no-repeat",
    'background-size': "cover",
}

const Login = (props) => {

    const history = useHistory()
    const location = useLocation()

    const dispatch = useDispatch()
    const onLogin = (data) => dispatch(login(data));

    const {from: loginRedirectUrl} = location.state || {from: {pathname: "/"}}

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const Login = (e) => {
        e.preventDefault()
        async function fn() {
            const data = {email, password}
            try{
                console.log(data)
                const apiRoot = "http://localhost:8000/account/login/"
                const response = await Axios.post(apiRoot, data)
                console.log(response)
                onLogin(response.data)
            }
            catch (err){
                console.log(err)
            }
            history.push(loginRedirectUrl)
        }
        fn()
    }
    return(
        <div>
            <div className="h-screen bg-cover" style={loginStyle} className={props.className}>
                <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                    <div className="w-full max-w-lg">
                        <div className="md:flex items-center justify-between">
                            <div className="w-full md:w-1/2 mr-auto">
                                <h1 className="text-6xl font-bold text-white">가입하여 더 많은 아이디어를 만나보세요.</h1>
                            </div>
                            <form className="item-center md:mx-w-md mt-6 card bg-white rounded-lg px-4 py-4 mb-6"
                                  onSubmit={Login}>
                                <p className="text-black font-medium text-center text-lg font-bold">회원가입</p>
                                <div className="">
                                    <label className="block text-sm text-white" htmlFor="email">이메일</label>
                                    <input
                                        className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        type="email" id="email" placeholder="이메일을 입력하세요." aria-label="email" value={email} required
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mt-2">
                                    <label className="block  text-sm text-white">비밀번호</label>
                                    <input
                                        className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        type="password" id="password" placeholder="비밀번호를 입력하세요." value={password} arial-label="password"
                                        onChange={(e)=>setPassword(e.target.value)}
                                        required/>
                                </div>

                                <div className="mt-4 items-center flex justify-between">
                                    <button
                                        className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                                        type="submit">로그인
                                    </button>
                                    <a className="inline-block right-0 align-baseline font-bold text-sm text-500 text-black hover:text-red-400"
                                       href="#">비밀번호를 잊으셨나요?</a>
                                </div>
                                <div className="text-center">
                                    <div onClick={() => props.toSignupClick()} className="inline-block right-0 align-baseline font-light text-sm text-500 hover:text-red-400">
                                        아직 Pinterest 를 사용하고 있지 않으신가요? 가입하기
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;