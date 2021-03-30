import React from 'react'
import SecondaryButton from "../Button/SecondaryButton";
import {axiosInstance} from "../../utils/axios";
import {notification} from "antd";

export default function FollowTagButton({tag}, props){
    const follow = async(tag) => {
        try{
            const res = await axiosInstance.post(`tags/${tag.id}/follow_tag`)
            notification.open({
                message: `태그 ${tag.tag_name} 을(를) 팔로잉합니다.`
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

    return(
        <SecondaryButton className={"rounded-sm px-4 py-4 mx-2"} onClick={(e)=>follow(tag)}>{tag.tag_name}</SecondaryButton>
    )
}