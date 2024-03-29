import {useHistory} from "react-router-dom";
import Layout from "../../components/Layout";
import {useRef, useState} from "react";
import {axiosInstance} from "../../utils/axios";
import {notification} from "antd";

export default function PinCreate(props){

    const history = useHistory()
    const fileInputRef = useRef()

    let[title, setTitle] = useState('')
    let[image, setImage] = useState('')
    let[imageURL, setImageURL] = useState('')
    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append('title', title)
        if(image)
            formData.append('image', image)
        else if(imageURL)
            formData.append('image_url', imageURL)
        try{
            const res = await axiosInstance.post('pins/', formData)
            history.push(`pin/${res.data.id}`)
            notification.open({
                message: '핀이 생성되었습니다.'
            })
        }
        catch (error) {
            const {data: ErrorMessages} = error.response
            notification.open({
                message: Object.entries(ErrorMessages).reduce(
                    (acc,[fieldName, err]) => {
                        acc += err
                        return acc
                    }
                ),
            })
        }
    }
    const handleChange = (e) => {
        setImage(e.target.files[0])
        setImageURL(URL.createObjectURL(e.target.files[0]))
    }
    const handleUrl = (e) => {
        setImageURL(e.target.value)
    }
    return (
        <Layout props={props}>
            <div className="bg-gray-200">
                <div className="max-w-screen-md py-10 mx-auto">
                    <div className={"overflow-hidden shadow-lg rounded-3xl bg-white"}>
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
                                                    <div className="my-2">이미지 업로드</div>
                                                </div>
                                                <div className="absolute text-sm bottom-0 text-center">권장사항 : 20MB 이하 고화질 원본 .jpg 파일</div>
                                            </div>
                                        </div>
                                        }
                                        { imageURL &&
                                        <img src={imageURL} />
                                        }
                                        이미지 URL 로 업로드 하기
                                        <input type="text" id='imageURL' placeholder="이미지 URL 입력해보세요!" value={imageURL} onChange={handleUrl}/>
                                    </div>
                                    <div className="sm:px-10 py-5 w-full sm:w-1/2" style={{minHeight: "510px"}}>
                                        <input ref={fileInputRef} type="file" className="hidden" onChange={handleChange}/>
                                        <input onChange={e => setTitle(e.target.value)} value={title} className="outline-none border-b focus:border-blue-500 focus:border-b-2 w-full py-2 text-3xl font-bold" placeholder="제목 추가" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}