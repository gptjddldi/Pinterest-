import React, {useEffect, useState} from 'react'
import Layout from "../../components/Layout";
import axios from "axios";
import {useSelector} from "react-redux";
import Tabs from "../../components/Tab";
import PostList from "../../components/PostList";
import FollowButton from "../../components/FollowButton";
import UserSignature from "../../components/UserSignature";
import {axiosInstance} from "../../utils/axios";

export default function Pin(props) {
    let pinNum = props.match.params.key1;
    const {loggedUser} = useSelector(state => ({
        loggedUser: state.userReducer.user,
    }))
    let [pinData, setPinData] = useState([]);
    let [userData, setUserData] = useState([]);

    function getData() {
        axiosInstance.get(`/pins/${pinNum}`)
            .then((res) => {
                setPinData(res.data);
                axiosInstance.get(`/pinterestAccounts/user/${res.data.author}/`).then((res) =>{
                    setUserData(res.data);
                }).catch((e) => console.log(e.response))
            }).catch((e)=>console.log(e.response))
    }
    useEffect(() => {
        getData();
    }, [pinNum])
    return (
        <Layout props={props}>
            <div className="md:container mx-auto max-w-lg">
                <div className="overflow-hidden shadow-lg rounded-3xl bg-white">
                    <div className="flex flex-wrap">
                        <div className="">
                                <img className="" src={pinData.image}/>
                        </div>
                        <div className="p-5 pl-10 ">
                            {/*<div className="flex items-center justify-between">*/}

                            {/*    { pinSaved ? (*/}
                            {/*        <div className="rounded-xl bg-gray-300 px-4 py-2">Saved to <b>{boardTarget.name}</b></div>*/}
                            {/*    ) : (*/}
                            {/*        <BoardSelector pin={pinData} onSave={onSave}/>*/}
                            {/*    )}*/}
                            {/*</div>*/}
                            <div className="pr-5">
                                <h1 className="text-4xl font-bold">{pinData.title}</h1>
                                {/*<p>{pinData.description}</p>*/}
                                <div className="flex justify-between my-2">
                                    { pinData.author &&
                                    <>
                                        <UserSignature user={userData} includeFollowers />
                                        {  pinData.author.username != loggedUser.username &&
                                        <>
                                            <FollowButton user={userData} />
                                        </>
                                        }
                                    </>
                                    }
                                </div>
                                <Tabs />
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="font-bold text-center mt-10 text-xl">비슷한 사진들이에요.</h2>
                <PostList url={`${pinNum}/sim_pin_list`}/>
            </div>
        </Layout>
    )
}