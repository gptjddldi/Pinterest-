import React, {useState} from 'react'
import Modal from "./Modal";
import axios from "axios";
import {useSelector} from "react-redux";

export default function BoardCreateModal(props){
    const {token} = useSelector(state => ({
        token: state.userReducer.token
    }))
    let [boardTitle, setBoardTitle] = useState("")
    const headers = {Authorization: `JWT ${token}`}
    async function createBoardSubmitHandler(e){
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8000/account/boards/', {
                title: boardTitle
            }, {headers})
            const {data} = res;
        }
        catch (e) {
            console.log(e);
        }
    }
    return(
        <Modal className={props.className} onClickOutside={props.onClickOutside}>
            <form onSubmit={createBoardSubmitHandler} className="p-4">
                <h1 className="text-xl font-bold text-center">Create Board</h1>
                <label className="text-sm">Name</label>
                <input onChange={e => setBoardTitle(e.target.value)} value={boardTitle} className="block w-full px-4 py-2 rounded-2xl border-2 border-gray-300" placeholder='Like "Places to Go" or "Recipes to Make"'/>
                <button
                    className={'px-4 py-2 rounded-3xl block ml-auto mt-4 font-bold bg-red-500 text-white hover:bg-red-700'}
                >Create</button>
            </form>
        </Modal>
    )
}