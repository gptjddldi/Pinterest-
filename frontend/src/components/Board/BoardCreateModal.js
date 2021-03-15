import React, {useState} from 'react'
import Modal from "../Modal";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {axiosInstance} from "../../utils/axios";
import {update} from "../../actions/userAction";

export default function BoardCreateModal(props){
    let [boardTitle, setBoardTitle] = useState("")
    const dispatch = useDispatch()
    const onUpdate = (data) => dispatch(update(data))
    function createBoardSubmitHandler(e) {
        e.preventDefault()
        axiosInstance.post('/boards/', {title:boardTitle}).then((res)=>console.log(res))
            .catch((e)=>console.log(e.response))

    }
    return(
        <Modal className={props.className} onClickOutside={props.onClickOutside}>
            <form onSubmit={createBoardSubmitHandler} className="p-4">
                <h1 className="text-xl font-bold text-center">Create Board</h1>
                <label className="text-sm">Name</label>
                <input onChange={e => setBoardTitle(e.target.value)} value={boardTitle} className="block w-full px-4 py-2 rounded-2xl border-2 border-gray-300" placeholder='보드의 제목을 입력하세요.'/>
                <button
                    className={'px-4 py-2 rounded-3xl block ml-auto mt-4 font-bold bg-red-500 text-white hover:bg-red-700'}
                >Create</button>
            </form>
        </Modal>
    )
}