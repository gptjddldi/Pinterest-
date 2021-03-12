import React from 'react'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {axiosInstance} from "../../utils/axios";
import Modal from "../Modal";
import SecondaryButton from "../Button/SecondaryButton";
import UserSignature from "../UserSignature";
import {update} from "../../actions/userAction";


const FollowingUserModal = (props) => {
    const [userList, setUserList] = useState([]);
    const dispatch = useDispatch()
    const onUpdate = (data) => dispatch(update(data));

    function unfollow(user){
        axiosInstance.post('pinterestAccounts/unfollow/', {'username': user.username})
            .then(()=> {
                axiosInstance.get('rest-auth/user/').then((res)=>onUpdate(res.data)).catch((e)=>console.log(e.response))
            })
            .catch((e)=>console.log(e))
    }
    useEffect(()=>{
        axiosInstance.get(`pinterestAccounts/following-list/`)
            .then((res)=>setUserList(res.data))
            .catch((e)=>console.log(e.response))
        // setUserList(loggedUser.following_user)
    }, [])
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