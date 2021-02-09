import React, {useRef, useState} from 'react'
import axios from "axios";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";


export default function PinCreate(props){
    const {token} = useSelector(state => ({
        token: state.userReducer.token,
    }))
    const history = useHistory()
    const apiRoot = 'http://localhost:8000/pins/'
    let [pinData, setPinData] = useState({
        title: '',
        image: '',
    })
    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append('title', pinData.title)
        formData.append('image', pinData.image)
        async function fn() {
            // const data = {username, avatar}
            const headers = {Authorization: `JWT ${token}`}
            const response = await axios.post(apiRoot, formData, {headers})
            // console.log(response.data)
            // const image_root_data = 'http://localhost:8000' + response.data.avatar
            const {data} = response
            // data.avatar = image_root_data
            // onUpdate(data)
            history.push(data.id)
        }
    }

    return (
        <Layout>
            <div className="bg-gray-200">
                <div className="max-w-screen-md py-10 mx-auto">
                    <Card>
                        <form onSubmit={handleSubmit}>
                            <div className="p-10">
                                <div className="flex items-center justify-between">
                                    <RoundedButton><FontAwesomeIcon icon={faEllipsisH} /></RoundedButton>
                                    <BoardSelector create onChange={board => setSelectedBoard(board)}/>
                                </div>
                                <div className="flex flex-wrap mt-5">
                                    <div className="flex flex-col w-full sm:w-1/2">
                                        { !imageURL &&
                                        <div className="bg-gray-300 w-64 rounded-lg p-2 flex-grow w-full cursor-pointer" onClick={() => fileInputRef.current.click()}>
                                            <div className="rounded-lg border-2 border-gray-400 border-dashed h-full relative">
                                                <div className="text-center mx-auto" style={{marginTop: "50%", minHeight: "15rem"}}>
                                                    <FontAwesomeIcon icon={faArrowCircleUp} />
                                                    <div className="my-2">Drag and drop or click to upload</div>
                                                </div>
                                                <div className="absolute text-sm bottom-0 text-center">Recommendation: Use high-quality .jpg files less than 20MB</div>
                                            </div>
                                        </div>
                                        }
                                        { imageURL &&
                                        <img src={imageURL} />
                                        }
                                    </div>
                                    <div className="sm:px-10 py-5 w-full sm:w-1/2" style={{minHeight: "510px"}}>
                                        <input onChange={e => setTitle(e.target.value)} value={title} className="outline-none border-b focus:border-blue-500 focus:border-b-2 w-full py-2 text-3xl font-bold" placeholder="Add your title" />
                                        <div className="font-bold">Ricardo Ramos</div>
                                        <input onChange={e => setDescription(e.target.value)} value={description}  className="outline-none border-b focus:border-blue-500 focus:border-b-2 w-full py-2" placeholder="Tell everyone what your pin is about" />
                                        <input onChange={e => setLink(e.target.value)} value={link}  className="outline-none border-b focus:border-blue-500 focus:border-b-2 w-full py-2" placeholder="Add destination link" />
                                        <input ref={fileInputRef} className="hidden" type="file" onChange={previewImage} />
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