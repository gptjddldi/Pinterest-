import React, {useState} from 'react'
import PostList from "../components/PostList";
import Layout from "../components/Layout";
import {useSelector} from "react-redux";
import Login from "./account/login";



function Authenticated() {
    return(
        <Layout>
            <PostList/>
        </Layout>
    )
}

export default function Home() {
    let {loginVisible, setLoginVisible} = useState("visible")
    let {signupVisible, setSignupVisible} = useState("hidden")
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
                   onSignupClick={() => {setSignupVisible("visible"); setLoginVisible("hidden")}}
            />
        </>
    )
}