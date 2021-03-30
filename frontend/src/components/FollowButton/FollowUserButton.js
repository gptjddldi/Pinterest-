import React from 'react'
import {useEffect, useState} from "react";
import SecondaryButton from "../Button/SecondaryButton";
import {axiosInstance} from "../../utils/axios";
import {notification} from "antd";

export default function FollowUserButton({user}){
    let [isFollowing, setIsFollowing] = useState(false)

    useEffect(() => {
        axiosInstance.get('pinterestAccounts/following-user').then((res) => {
            for(let idx in res.data)
                if(res.data[idx].username === user.username){
                    setIsFollowing(true)
                    break;
                } else setIsFollowing(false)
        })
    }, [user, isFollowing])

    const follow = async() => {
        try{
            const res = await axiosInstance.post('pinterestAccounts/follow', {'username': user.username})
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
            const res = await axiosInstance.post('pinterestAccounts/unfollow', {'username': user.username})
            setIsFollowing(false)
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
    if(isFollowing){
        return <SecondaryButton onClick={unfollow} className="px-4 py-2 rounded-3xl ml-auto ">팔로잉중</SecondaryButton>
    }
    else{
        return <SecondaryButton onClick={follow} className="px-4 py-2 rounded-3xl ml-auto ">팔로우하기</SecondaryButton>
    }
}