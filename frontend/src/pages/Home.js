import React, {useState} from 'react'
import PostList from "../components/PostList";
import Layout from "../components/Layout";
import {useSelector} from "react-redux";
import Login from "./account/login";
import Signup from "./account/signup";



function Authenticated() {
    return(
        <Layout>
            <PostList/>
        </Layout>
    )
}



export default function Home() {
    let [loginVisible, setLoginVisible] = useState("visible")
    let [signupVisible, setSignupVisible] = useState("hidden")
    const {isAuth} = useSelector(state => ({
        isAuth: state.userReducer.isAuth
    }))
    if (isAuth) {
        return (
            <Layout>
                <PostList/>
            </Layout>
        )
    }
    return(
        <>
            <Login className={loginVisible}
                   toSignupClick={() => {setLoginVisible("hidden"); setSignupVisible("visible");}}
            />
            <Signup className={signupVisible}
                   toLoginClick={() => {setLoginVisible("visible"); setSignupVisible("hidden");}}
            />
        </>
    )
}