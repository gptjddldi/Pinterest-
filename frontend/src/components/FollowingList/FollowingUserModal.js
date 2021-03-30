import React from 'react'
import {useEffect, useState} from "react";
import {axiosInstance} from "../../utils/axios";
import Modal from "../Modal";
import SecondaryButton from "../Button/SecondaryButton";
import UserSignature from "../UserSignature";
import {notification} from "antd";


const FollowingUserModal = (props) => {
    const [userList, setUserList] = useState([]);

    const unfollow = async(user) => {
        try{
            const res = await axiosInstance.post('pinterestAccounts/unfollow', {'username': user.username})
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
    useEffect(()=>{
        axiosInstance.get(`pinterestAccounts/following-user`)
            .then((res)=>setUserList(res.data))
            .catch((e)=>console.log(e.response))
    }, [userList])

    return(
        <Modal className={props.className} onClickOutside={props.onClickOutside}>
            <h1 className="text-xl font-bold text-center">팔로잉 중인 사람</h1>
            <ul >
                {userList.map((user, index) => (
                    <div className={"flex justify-between my-2"}>
                        <UserSignature user={user} includeFollowers />
                        <SecondaryButton className={"rounded-sm"} onClick={()=>unfollow(user)}>언팔로우</SecondaryButton>
                    </div>
                ))}

            </ul>
        </Modal>
    )
}
export default FollowingUserModal