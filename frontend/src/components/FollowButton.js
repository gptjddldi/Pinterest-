import React from 'react'
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import SecondaryButton from "./Button/SecondaryButton";
import {axiosInstance} from "../utils/axios";

export default function FollowButton({user}){
    let [isFollowing, setIsFollowing] = useState(false)
    const {loggedUser} = useSelector(state => ({
        loggedUser: state.userReducer.user,
    }))

    useEffect(() => {
        if(loggedUser.following.indexOf(user) !== -1){
            setIsFollowing(true)
        } else setIsFollowing(false)
    }, [user])

    function follow(){
        axiosInstance.post('account/follow/', {'username': user.username})
            .then(()=>setIsFollowing(true))
            .catch((e)=>console.log(e))
    }
    function unfollow(){
        axiosInstance.post('account/unfollow/', {'username': user.username})
            .then(()=>setIsFollowing(false))
            .catch((e)=>console.log(e))
    }

    if(isFollowing){
        return <SecondaryButton onClick={unfollow} className="px-4 py-2 rounded-3xl ml-auto ">팔로잉중</SecondaryButton>
    }
    else{
        return <SecondaryButton onClick={follow} className="px-4 py-2 rounded-3xl ml-auto ">팔로우하기</SecondaryButton>
    }
}