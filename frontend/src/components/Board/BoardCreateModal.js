import React, {useState} from 'react'
import Modal from "../Modal";
import {axiosInstance} from "../../utils/axios";
import {notification} from "antd";

export default function BoardCreateModal(props){
    let [boardTitle, setBoardTitle] = useState("")
    const createBoardSubmitHandler = async(e) => {
        e.preventDefault()
        try{
            const res = await axiosInstance.post('/boards', {title:boardTitle})
            notification.open({
                message: "생성되었습니다."
            })
            window.location.reload()
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
    return(
        <Modal className={props.className} onClickOutside={props.onClickOutside}>
            <form onSubmit={createBoardSubmitHandler} className="p-4">
                <h1 className="text-xl font-bold text-center">보드 만들기</h1>
                <label className="text-sm">제목</label>
                <input onChange={e => setBoardTitle(e.target.value)} value={boardTitle} className="block w-full px-4 py-2 rounded-2xl border-2 border-gray-300" placeholder='보드의 제목을 입력하세요.'/>
                <button
                    className={'px-4 py-2 rounded-3xl block ml-auto mt-4 font-bold bg-red-500 text-white hover:bg-red-700'}
                >생성</button>
            </form>
        </Modal>
    )
}