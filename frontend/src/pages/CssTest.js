import React, {useRef, useState} from 'react'

import Layout from "../components/Layout";
import PrimaryButton from "../components/Button/PrimaryButton";
import PostList from "../components/PostList";


export default function PinCreate(props){


    return(
        <Layout props={props}>
            <div className="max-w-screen-md mx-auto my-10">
                <h1 className="text-2xl font-bold">팔로우 하는 사람들의</h1>
                <PrimaryButton
                    className={'px-4 py-2 rounded-3xl block ml-auto hover:bg-red-700'}
                >팔로우할 만한 사람 찾기</PrimaryButton>
            </div>
            <PostList filter={`following/`}/>
        </Layout>
    )
}

