import React from 'react'
import PostList from "../components/PostList";
import AuthModal from "../components/AuthModal";

export default function Home() {
    return(
        <div>
            <AuthModal/>
            <PostList/>

        </div>
    )
}