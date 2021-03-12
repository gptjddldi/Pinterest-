import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import SecondaryButton from "../Button/SecondaryButton";
import {axiosInstance} from "../../utils/axios";
import {update} from "../../actions/userAction";

export default function FollowTagButton({tag}, props){
    const {loggedUser} = useSelector(state => ({
        loggedUser: state.userReducer.user,
    }))
    const dispatch = useDispatch()
    const onUpdate = (data) => dispatch(update(data));

    function follow(tag){
        axiosInstance.post(`tags/${tag.id}/follow_tag/`)
            .catch((e)=>console.log(e.response))
    }
    function unfollow(tag){
        axiosInstance.post(`tags/${tag.id}/unfollow_tag/`)
            .catch((e)=>console.log(e.response))
    }

    return(
        <SecondaryButton className={"rounded-sm px-4 py-4 mx-2"} onClick={(e)=>follow(tag)}>{tag.tag_name}</SecondaryButton>
    )
}