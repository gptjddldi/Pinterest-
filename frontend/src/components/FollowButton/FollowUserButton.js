import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import SecondaryButton from "../Button/SecondaryButton";
import {axiosInstance} from "../../utils/axios";
import {update} from "../../actions/userAction";
import {notification} from "antd";

export default function FollowUserButton({user}){
    let [isFollowing, setIsFollowing] = useState(false)
    const {loggedUser} = useSelector(state => ({
        loggedUser: state.userReducer.user,
    }))
    const dispatch = useDispatch()
    const onUpdate = (data) => dispatch(update(data));

    useEffect(() => {
        axiosInstance.get('pinterestAccounts/following-list/').then((res) => {
            for(let idx in res.data)
                if(res.data[idx].username === user.username){
                    setIsFollowing(true)
                    break;
                }
        })
    }, [user,loggedUser, isFollowing])

    const follow = async() => {
        try{
            const res = await axiosInstance.post('pinterestAccounts/follow/', {'username': user.username})
            setIsFollowing(true)
            notification.open({
                message: `${user.username}님을 팔로잉합니다.`
            })
        }
        catch(error){
            const {data: ErrorMessages} = error.response
            notification.open({
                message: Object.entries(ErrorMessages).reduce(
                    (acc,[fieldName, err]) => {
                        acc += err
                        return acc
                    }
                ),
            })
        }
    }
    const unfollow = async() => {
        try{
            const res = await axiosInstance.post('pinterestAccounts/unfollow/', {'username': user.username})
            setIsFollowing(true)
            notification.open({
                message: `${user.username}님을 팔로우 취소합니다.`
            })
        }
        catch(error){
            const {data: ErrorMessages} = error.response
            notification.open({
                message: Object.entries(ErrorMessages).reduce(
                    (acc,[fieldName, err]) => {
                        acc += err
                        return acc
                    }
                ),
            })
        }
    }
    // function follow(){
    //     axiosInstance.post('pinterestAccounts/follow/', {'username': user.username})
    //         .then(()=> {
    //             setIsFollowing(true)
    //             axiosInstance.get('rest-auth/user/').then((res)=>onUpdate(res.data)).catch((e)=>console.log(e.response))
    //         })
    //         .catch((e)=>console.log(e.response))
    // }
    // function unfollow(){
    //     axiosInstance.post('pinterestAccounts/unfollow/', {'username': user.username})
    //         .then(()=> {
    //             setIsFollowing(false)
    //             axiosInstance.get('rest-auth/user/').then((res)=>onUpdate(res.data)).catch((e)=>console.log(e.response))
    //         })
    //         .catch((e)=>console.log(e))
    // }

    if(isFollowing){
        return <SecondaryButton onClick={unfollow} className="px-4 py-2 rounded-3xl ml-auto ">팔로잉중</SecondaryButton>
    }
    else{
        return <SecondaryButton onClick={follow} className="px-4 py-2 rounded-3xl ml-auto ">팔로우하기</SecondaryButton>
    }
}