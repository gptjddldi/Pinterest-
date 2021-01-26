import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/userAction";
import Layout from "../components/Layout";
import ProfilePicture from "../components/ProfilePicture";
import axios from "axios";

export default function Profile(props) {
    const [userData, setUserData] = useState([])
    const {token} = useSelector(state => ({
        token: state.userReducer.token
    }))
    // console.log(props.match.params.key1)
    const username = props.match.params.key1;
    useEffect(() => {
        async function getUserData(username){
            const apiRoot = `http://localhost:8000/account/user/${username}/`
            try{
                const headers = {Authorization: `JWT ${token}`}
                const res = await axios.get(apiRoot, {headers})
                const {data} = res
                setUserData(data)
            }
            catch (err){
                console.log(err)
            }
        }
        getUserData(username);
        console.log(userData);
    })



    return(
        <Layout>
            <div className="text-center">
                <div className="flex justify-center">
                    <ProfilePicture user={userData} size="3"/>
                </div>
                <h1 className="text-3xl font-bold">{userData.email}</h1>
                <div>@{userData.username}</div>
                <div>팔로워 {userData.follower ? userData.follower.length : 0} 명 · 팔로잉 {userData.following ? userData.following.length : 0} 명</div>
            </div>
        </Layout>
    )
}