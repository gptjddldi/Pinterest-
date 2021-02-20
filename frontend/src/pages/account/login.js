import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {login} from "../../actions/userAction";
import {Link, useHistory, useLocation} from "react-router-dom";
import {axiosInstance} from "../../utils/axios";

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
        const data = {email, password}
        axiosInstance.post('account/login/', data).then((res)=> {
            onLogin(res.data);
            history.push(loginRedirectUrl)
        }).catch((e) => console.log(e))
    }
    return(
        <div className="bg-white h-screen w-full flex flex-wrap">

            <div className="w-full md:w-1/2 flex flex-col">

                <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                    <svg className="text-red-500" height="32" width="32" viewBox="0 0 24 24" aria-label="Pinterest logo">
                        <path
                            d="M0 12c0 5.123 3.211 9.497 7.73 11.218-.11-.937-.227-2.482.025-3.566.217-.932 1.401-5.938 1.401-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 0 1 .083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.173.265-.4.159-1.492-.694-2.424-2.875-2.424-4.627 0-3.769 2.737-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.117-2.595 7.431-6.199 7.431-1.211 0-2.348-.63-2.738-1.373 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12">
                        </path>
                    </svg>
                    <div className={"font-bold text-lg text-red-500"}>Pinterest</div>
                </div>

                <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                    <p className="text-center text-3xl">환영합니다. Pinterest Clone Page 입니다.</p>
                    <form className="flex flex-col pt-3 md:pt-8" onSubmit={Login}>
                        <div className="flex flex-col pt-4">
                            <label for="email" className="text-lg">이메일</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"type="email" id="email" placeholder="이메일을 입력하세요." aria-label="email" value={email} required
                                   onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col pt-4">
                            <label for="password" className="text-lg">비밀번호</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"type="password" id="password" placeholder="비밀번호를 입력하세요." value={password} arial-label="password"
                                   onChange={(e)=>setPassword(e.target.value)}
                                   required/>
                        </div>

                        <input type="submit" value="로그인" className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"/>
                    </form>
                    <div className="text-center pt-12 pb-12">
                        <p className="hover:text-red-500" onClick={()=> props.toSignupClick()}>아직 Pinterest 를 사용하고 있지 않으신가요? 가입하기</p>
                    </div>
                </div>

            </div>

            <div className="w-1/2 shadow-2xl">
                <img className="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0"/>
            </div>
        </div>
    )
}
export default Login;