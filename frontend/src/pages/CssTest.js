import React, {useRef, useState} from 'react'
import axios from "axios";

import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";


export default function PinCreate(props){
    const {token} = useSelector(state => ({
        token: state.userReducer.token,
    }))
    const history = useHistory()
    const fileInputRef = useRef()
    const apiRoot = 'http://localhost:8000/pins/'
    let[title, setTitle] = useState('')
    let[image, setImage] = useState('')
    let[imageURL, setImageURL] = useState('')
    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append('title', title)
        formData.append('image', image)

        async function fn() {
            try {
                const headers = {Authorization: `JWT ${token}`}
                const response = await axios.post(apiRoot, formData, {headers})
                const {data} = response
                history.push(`pin/${data.id}`)
            }
            catch (err) { console.log(err.response)}
        }
        fn();
    }
    const handleChange = (e) => {
        setImage(e.target.files[0])
        setImageURL(URL.createObjectURL(e.target.files[0]))
    }
    return (
        <Layout props={props}>
            <div className="bg-gray-200">
                <div className="max-w-screen-md py-10 mx-auto">
                    <Card>
                        <form onSubmit={handleSubmit}>
                            <div className="p-10">
                                <div className="flex items-center justify-between">
                                    <button className="font-bold text-white px-4 py-2 rounded-r-lg" style={{backgroundColor: '#E60023'}}>저장</button>
                                </div>
                                <div className="flex flex-wrap mt-5">
                                    <div className="flex flex-col w-full sm:w-1/2">
                                        { !imageURL &&
                                        <div className="bg-gray-300 w-64 rounded-lg p-2 flex-grow w-full cursor-pointer" onClick={() => fileInputRef.current.click()}>
                                            <div className="rounded-lg border-2 border-gray-400 border-dashed h-full relative">
                                                <div className="text-center mx-auto" style={{marginTop: "50%", minHeight: "15rem"}}>
                                                    <div className="my-2">드래그하거나 클릭하여 업로드</div>
                                                </div>
                                                <div className="absolute text-sm bottom-0 text-center">권장사항 : 20MB 이하 고화질 원본 .jpg 파일</div>
                                            </div>
                                        </div>
                                        }
                                        { imageURL &&
                                        <img src={imageURL} />
                                        }
                                    </div>
                                    <div className="sm:px-10 py-5 w-full sm:w-1/2" style={{minHeight: "510px"}}>
                                        <input ref={fileInputRef} type="file" className="hidden" onChange={handleChange}/>
                                        <input onChange={e => setTitle(e.target.value)} value={title} className="outline-none border-b focus:border-blue-500 focus:border-b-2 w-full py-2 text-3xl font-bold" placeholder="제목 추가" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </Layout>
    )
}