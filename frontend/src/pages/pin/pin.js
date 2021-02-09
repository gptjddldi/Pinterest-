import React, {useEffect, useState} from 'react'
import Layout from "../../components/Layout";
import axios from "axios";
import {useSelector} from "react-redux";
import Tabs from "../../components/Tab";
import PostList from "../../components/PostList";
import FollowButton from "../../components/FollowButton";
import UserSignature from "../../components/UserSignature";

export default function Pin(props) {
    let pinNum = props.match.params.key1;
    const {token, loggedUser} = useSelector(state => ({
        token: state.userReducer.token,
        loggedUser: state.userReducer.user,
    }))
    let [pinData, setPinData] = useState([]);
    let [userData, setUserData] = useState([]);
    async function getPinData() {
        const apiRoot = `http://localhost:8000/pins/${pinNum}/`
        try{
            const headers = {Authorization: `JWT ${token}`}
            const res = await axios.get(apiRoot, {headers})
            const {data} = res
            setPinData(data);
            // return data;
            console.log(">>",pinData);
        }catch (e) {
            console.log(e);
        }
    }
    async function getUserData(username){
        const apiRoot = `http://localhost:8000/account/user/${username}/`
        try{
            const headers = {Authorization: `JWT ${token}`}
            const res = await axios.get(apiRoot, {headers})
            const {data} = res
            const image_root_data = 'http://localhost:8000' + data.avatar
            data.avatar = image_root_data
            setUserData(data)
            // console.log(data);
            // return data;
            // console.log(userData)

        }
        catch (err){
            console.log(err)
        }
    }
    // getPinData();
    useEffect(() => {
        if(pinData.length === 0)
            getPinData();
        if(userData.length === 0)
           getUserData(pinData.author);
        return () => {

        };
    }, )
    // console.log(userData);
    return (
        <Layout>
            <div className="md:container mx-auto max-w-lg">
                <div className="overflow-hidden shadow-lg rounded-3xl bg-white">
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2">
                            {/*<a href={pinData.link}>*/}
                                <img className="h-screen" src={pinData.image} sizes={"max-height: 400px"} />
                            {/*</a>*/}
                        </div>
                        <div className="p-5 pl-10 w-full md:w-1/2">
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
                <h2 className="font-bold text-center mt-10 text-xl">More like this</h2>
                <PostList filters={`ordering=-created_at`} />
            </div>
        </Layout>
    )
}