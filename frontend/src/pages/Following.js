import React, {useState} from 'react'
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import PrimaryButton from "../components/Button/PrimaryButton";
import {useSelector} from "react-redux";
import FollowingTagModal from "../components/FollowingList/FollowingTagModal";
import FollowingUserModal from "../components/FollowingList/FollowingUserModal";

function Following(props) {
    const {loggedUser} = useSelector(state => ({
        loggedUser: state.userReducer.user
    }))
    const [followingTagModalVisibility, setFollowingTagModalVisibility] = useState("hidden")
    const [followingUserModalVisibility, setFollowingUserModalVisibility] = useState("hidden")

    return(
        <Layout props={props}>
            <div className="max-w-screen-md mx-auto my-10">
                <PrimaryButton className={"my-3 mx-3"} onClick={()=>setFollowingUserModalVisibility("block")}>팔로우 중인 사람</PrimaryButton>
                <PrimaryButton onClick={()=>setFollowingTagModalVisibility("block")}>팔로우 중인 태그</PrimaryButton>
            </div>
            <FollowingTagModal className={followingTagModalVisibility} onClickOutside={() => setFollowingTagModalVisibility("hidden")}/>
            <FollowingUserModal className={followingUserModalVisibility} onClickOutside={() => setFollowingUserModalVisibility("hidden")}/>

            <PostList url={'following_pin_list'}/>
        </Layout>
    )
} export default Following