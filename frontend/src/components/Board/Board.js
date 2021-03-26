import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import PrimaryButton from "../Button/PrimaryButton";
import {axiosInstance} from "../../utils/axios";
import BoardCreateModal from "./BoardCreateModal";
import {notification} from "antd";

function Board({pin_id, boards}) {
    let [userBoard, setUserBoard] = useState([])
    let [dropdownVisibility, setDropdownVisibility] = useState("hidden")
    let [selectedBoard, setSelectedBoard] = useState({})
    let [newBoard, setNewBoard] = useState('')
    let [createBoardModalVisibility, setCreateBoardModalVisibility] = useState("hidden")

    useEffect( () => {
        setUserBoard(boards)
        if (userBoard && userBoard.length > 0) {
            selectionHandler(userBoard[0])
        }
        }, [boards, userBoard])


    async function addPin() {
        try {
            const res = await axiosInstance.post(`boards/${selectedBoard.id}/add_pin/`, {id: pin_id})
            notification.open({
                message: res.data['success'],
            })
        }
        catch(e){
            notification.open({
                message: e.response.data['pin']
            })
        }
    }

    function selectionHandler(board){
        setSelectedBoard(board);
    }
    function dropDownHandler(){
        if(dropdownVisibility === "block")
            setDropdownVisibility("hidden")
        else setDropdownVisibility("block")
    }
    if(userBoard && userBoard.length > 0){
        return(
            <div>
                <div className="flex">
                    <button type="button" onClick={() => dropDownHandler()} className="bg-gray-200 px-4 py-2 rounded-l-lg flex items-center justify-between w-48"><div className="">{selectedBoard.title || newBoard}</div></button>
                    <PrimaryButton className="px-4 rounded-r-lg" style={{backgroundColor: '#E60023'}} onClick={() =>{addPin(); setDropdownVisibility("hidden")}}>save</PrimaryButton>
                </div>
                <div className={`bg-white border-2 border-gray-300 rounded-xl p-2 mt-2 overflow-y-scroll absolute w-48 ${dropdownVisibility}`} style={{maxHeight: "20em"}}>
                    {userBoard.map((board,index) => (
                        <div onClick={() => selectionHandler(board)} className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg my-1" key={index}>
                            {board.title}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    else{
        return  (
            <div>
                <PrimaryButton onClick={()=>setCreateBoardModalVisibility("block")}>보드 만들기</PrimaryButton>
                <BoardCreateModal className={createBoardModalVisibility} onClickOutside={() => setCreateBoardModalVisibility("hidden")} />
            </div>
        )
    }
} export default React.memo(Board)