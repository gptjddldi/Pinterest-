import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useSelector} from "react-redux";
import {Dropdown} from "antd";
import PrimaryButton from "./Button/PrimaryButton";

function Board({pin}) {
    let [userBoard, setUserBoard] = useState([])
    let [dropdownVisibility, setDropdownVisibility] = useState("hidden")
    let [selectedBoard, setSelectedBoard] = useState({})
    let [newBoard, setNewBoard] = useState('')
    let [isUsed, setIsUsed] = useState(false)
    const boardRoot = 'http://localhost:8000/account/boards/'

    const {token} = useSelector(state => ({
        token: state.userReducer.token
    }))
    useEffect( () => {
        async function getUserBoard() {
            try{
                const headers = {Authorization: `JWT ${token}`}
                const res = await axios.get(boardRoot, {headers})
                const {data} = res
                setUserBoard(data)
            }
            catch (e) {
                console.log(e)
            }
        }
        getUserBoard()
        if(userBoard && userBoard.length > 0){
            selectionHandler(userBoard[0])
        }
    }, [])


    async function addPin() {
        const headers = {Authorization: `JWT ${token}`}
        console.log(selectedBoard)
        if(selectedBoard.title === undefined) {
            try {
                console.log("AddPIN")
                const res = await axios.post('http://localhost:8000/account/boards/', {
                    title: newBoard
                }, {headers})
                const {data} = res;
                setSelectedBoard(data)
                try {
                    await axios.post(`http://localhost:8000/account/board/${data.id}/add_pin`, {
                        id: pin.id
                    }, {headers})
                } catch (e) {
                    console.log(e)
                }
            } catch (e) {
                console.log(e)
            }
        }
        else {
            try {
                await axios.post(`http://localhost:8000/account/board/${selectedBoard.id}/add_pin`, {
                    id: pin.id
                }, {headers})
            } catch (e) {
                console.log(e)
            }
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
                    <PrimaryButton className="px-4 py-2 rounded-r-lg" style={{backgroundColor: '#E60023'}} onClick={() =>{addPin(); setDropdownVisibility("hidden")}} >Save</PrimaryButton>
                </div>
                <div className={`bg-white border-2 border-gray-300 rounded-xl p-2 mt-2 overflow-y-scroll absolute w-48 ${dropdownVisibility}`} style={{maxHeight: "20em"}}>
                    {userBoard.map((board,index) => (
                        <div onClick={() => selectionHandler(board)} className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg my-1" key={index}>
                            {board.title}
                        </div>
                    ))}
                    <input type="text" placeholder="보드 만들기" value={newBoard} onChange={(e) => {
                        setNewBoard(e.target.value);
                        setSelectedBoard({})
                    }}/>
                </div>
            </div>
        )
    }
    else{
        return  <div></div>
    }
} export default React.memo(Board)