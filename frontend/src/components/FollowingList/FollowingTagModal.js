import React from 'react'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {axiosInstance} from "../../utils/axios";
import Modal from "../Modal";
import SecondaryButton from "../Button/SecondaryButton";
import {update} from "../../actions/userAction";


const FollowingTagModal = (props) => {
    const [tagList, setTagList] = useState([]);
    const {loggedUser} = useSelector(state => ({
        loggedUser: state.userReducer.user
    }))

    const dispatch = useDispatch()
    const onUpdate = (data) => dispatch(update(data));

    function unfollow(tag){
        axiosInstance.post(`tags/${tag.id}/unfollow_tag/`)
            .catch((e)=>console.log(e.response))
    }
    useEffect(()=>{
        axiosInstance.get(`tags/?users__username=${loggedUser.username}`)
            .then((res)=>setTagList(res.data))
            .catch((e)=>console.log(e.response))
    }, [])
    return(
        <Modal className={props.className} onClickOutside={props.onClickOutside}>
            <h1 className="text-xl font-bold text-center">팔로잉 중인 태그</h1>
            <ul >
                {tagList.map((tag, index) => (
                    <div className={"flex justify-between my-2"}>
                        <div className={"font-bold"}>{tag.tag_name}</div>
                        <SecondaryButton onClick={(e) => unfollow(tag)} className={"rounded-sm"}>언팔로우</SecondaryButton>
                    </div>
                ))}

            </ul>
        </Modal>
    )
}
export default FollowingTagModal