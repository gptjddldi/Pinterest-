import React from 'react'
import {useEffect, useState} from "react";
import {axiosInstance} from "../../utils/axios";
import Modal from "../Modal";
import SecondaryButton from "../Button/SecondaryButton";
import {notification} from "antd";

const FollowingTagModal = (props) => {
    const [tagList, setTagList] = useState([]);

    const unfollow = async(tag) => {
        try{
            const res = await axiosInstance.post(`tags/${tag.id}/unfollow_tag`)
            notification.open({
                message: `태그 ${tag.tag_name} 을(를) 팔로잉 취소합니다.`
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
        axiosInstance.get('pinterestAccounts/following-tag')
            .then((res)=>setTagList(res.data))
            .catch((e)=>console.log(e.response))
    }, [tagList])
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