import React, {useEffect, useRef, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import Layout from "../components/Layout";
import ProfilePicture from "../components/ProfilePicture";
import PostList from "../components/PostList";
import BoardsFeed from "../components/Board/BoardsFeed";
import BoardCreateModal from "../components/Board/BoardCreateModal";
import useOnClickOutside from "../utils/useOnClickOutside";
import FollowButton from "../components/FollowButton";
import {axiosInstance} from "../utils/axios";

function Profile(props) {
    const [userData, setUserData] = useState([])
    const [boards, setBoards] = useState([])
    let [addMenuVisibility, setAddMenuVisibility] = useState("hidden")
    const {loggedUser} = useSelector(state => ({
        loggedUser: state.userReducer.user,
    }))
    const username = props.match.params.key1;
    useEffect(() => {
        axiosInstance(`pinterestAccounts/user/${username}`).then((res) => {
            const image_root_data = res.data.avatar? 'http://localhost:8000' + res.data.avatar : '';
            res.data.avatar = image_root_data;
            setUserData(res.data)
        }).catch((e) => console.log(e))

        axiosInstance(`pinterestAccounts/boards/?author__username=${username}`).then((res) => setBoards(res.data))
            .catch((e) => console.log(e));
    },[] )

    function AddWidget(props) {
        let [createBoardModalVisibility, setCreateBoardModalVisibility] = useState("hidden")
        let ref = useRef()
        useOnClickOutside(ref, () => setAddMenuVisibility("hidden"))
        function handleAddButtonOnClick(e){
            if(addMenuVisibility == "block") setAddMenuVisibility("hidden")
            else setAddMenuVisibility("block")
        }
        return(
            <div>
                <button onClick={handleAddButtonOnClick} className={`px-2 py-1 rounded-full hover:bg-gray-200 block ml-auto`}>+</button>
                <div className="relative">
                    <div className={`rounded-xl px-4 py-2 w-40 bg-white shadow-xl ${addMenuVisibility} absolute right-0`}>
                        <div className="my-2 text-sm"> 만들기</div>
                        <Link to={'/pin-add'}><button className="text-left text-black w-full block my-2 font-bold p-2 rounded-xl hover:bg-gray-300 hover:text-black">핀</button></Link>
                        <button className="text-left w-full block my-2 font-bold p-2 rounded-xl hover:bg-gray-300" onClick={() => setCreateBoardModalVisibility("block")}>보드</button>
                    </div>
                </div>
                <BoardCreateModal className={createBoardModalVisibility} onClickOutside={() => setCreateBoardModalVisibility("hidden")} />
            </div>
        )
    }

    return(
        <Layout props={props}>
            <div className="text-center">
                <div className="flex justify-center">
                    <ProfilePicture user={userData} size="3"/>
                </div>
                <h1 className="text-3xl font-bold">{userData.email}</h1>
                <div>@{userData.username}</div>
                <div>팔로워 {userData.follower ? userData.follower.length : 0} 명 · 팔로잉 {userData.following ? userData.following.length : 0} 명</div>
                {userData.username != loggedUser.username &&
                <div className="mt-5"><FollowButton user={userData}/></div>
                }
            </div>
            <div className="container mx-auto mt-10">
                {userData.username && loggedUser.username && (
                    <>
                        {(userData.username == loggedUser.username) ? (
                            <>
                                <AddWidget/>
                                <BoardsFeed username={userData.username} boards={boards}/>
                            </>
                        ) : (
                            <PostList filter={`pins/?author__username=${userData.username}`}/>
                        )}
                    </>
                )}
            </div>
        </Layout>
    )
}export default React.memo(Profile)