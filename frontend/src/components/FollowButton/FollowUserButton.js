import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import SecondaryButton from "../Button/SecondaryButton";
import {axiosInstance} from "../../utils/axios";
import {update} from "../../actions/userAction";

export default function FollowUserButton({user}){
    let [isFollowing, setIsFollowing] = useState(false)
    const {loggedUser} = useSelector(state => ({
        loggedUser: state.userReducer.user,
    }))
    const dispatch = useDispatch()
    const onUpdate = (data) => dispatch(update(data));

    useEffect(() => {
        if(loggedUser.following_user.indexOf(user.id) !== -1){
            setIsFollowing(true)
        } else setIsFollowing(false)
    }, [user,loggedUser, isFollowing])

    function follow(){
        axiosInstance.post('pinterestAccounts/follow/', {'username': user.username})
            .then(()=> {
                setIsFollowing(true)
                axiosInstance.get('rest-auth/user/').then((res)=>onUpdate(res.data)).catch((e)=>console.log(e.response))
            })
            .catch((e)=>console.log(e.response))
    }
    function unfollow(){
        axiosInstance.post('pinterestAccounts/unfollow/', {'username': user.username})
            .then(()=> {
                setIsFollowing(false)
                axiosInstance.get('rest-auth/user/').then((res)=>onUpdate(res.data)).catch((e)=>console.log(e.response))
            })
            .catch((e)=>console.log(e))
    }

    if(isFollowing){
        return <SecondaryButton onClick={unfollow} className="px-4 py-2 rounded-3xl ml-auto ">팔로잉중</SecondaryButton>
    }
    else{
        return <SecondaryButton onClick={follow} className="px-4 py-2 rounded-3xl ml-auto ">팔로우하기</SecondaryButton>
    }
}