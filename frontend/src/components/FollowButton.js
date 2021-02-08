import React from 'react'
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";

export default function FollowButton({user}){
    let [isFollowing, setIsFollowing] = useState(false)
    const {loggedUser, token} = useSelector(state => ({
        loggedUser: state.userReducer.user,
        token: state.userReducer.token
    }))
    const headers = {Authorization: `JWT ${token}`}
    useEffect(() => {
        if(loggedUser.following.indexOf(user) !== -1){
            setIsFollowing(true)
        } else setIsFollowing(false)
    }, [user])

    async function follow(){
        try{
            await axios.post('http://localhost:8000/account/follow/', {
                'username': user.username
            },{headers} )
            setIsFollowing(true)
        }
        catch (e) {
            console.log(e)
        }
    }
    async function unfollow(){
        try{
            await axios.post('http://localhost:8000/account/unfollow/', {
                'username': user.username
            },{headers} )
            setIsFollowing(false)
        }
        catch (e) {
            console.log(e)
        }
    }
    if(isFollowing){
        return <button onClick={unfollow} className="px-4 py-2 rounded-3xl ml-auto font-bold" style={{backgroundColor:"#EFEFEF", color:"#000000"}}>팔로잉중</button>
    }
    else{
        return <button onClick={follow} className="px-4 py-2 rounded-3xl ml-auto font-bold" style={{backgroundColor:"#EFEFEF", color:"#000000"}}>팔로우하기</button>
    }
}