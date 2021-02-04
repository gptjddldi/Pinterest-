import React from 'react'
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import {useSelector} from "react-redux";

const apiRoot = 'http://localhost:8000/following/'


function Following() {
    const {user} = useSelector(state => ({
        user: state.userReducer.user
    }))
    return(
        <Layout>
            <div className="max-w-screen-md mx-auto my-10">
                <h1 className="text-2xl font-bold">팔로우 하는 사람들의</h1>
                <button
                    className={'px-4 py-2 rounded-3xl block ml-auto font-bold bg-red-500 text-white hover:bg-red-700'}
                    >팔로우할 만한 사람 찾기</button>
            </div>
            <PostList filter={`author__following__username=${user.username}`}/>
        </Layout>
    )
} export default React.memo(Following)