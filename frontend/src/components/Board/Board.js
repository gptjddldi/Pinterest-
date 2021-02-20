import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import PrimaryButton from "../Button/PrimaryButton";
import {axiosInstance} from "../../utils/axios";

function Board({pin}) {
    let [userBoard, setUserBoard] = useState([])
    let [dropdownVisibility, setDropdownVisibility] = useState("hidden")
    let [selectedBoard, setSelectedBoard] = useState({})
    let [newBoard, setNewBoard] = useState('')
    let [isUsed, setIsUsed] = useState(false)

    const {loggedUser} = useSelector(state => ({
        loggedUser: state.userReducer.user,
    }))
    useEffect( () => {
        axiosInstance.get(`account/boards/?author__username=${loggedUser.username}`)
            .then((res)=> setUserBoard(res.data))
            .catch((e)=>console.log(e))

        if(userBoard && userBoard.length > 0){
            selectionHandler(userBoard[0])
        }
    }, [])


    function addPin() {
        if(selectedBoard.title === undefined) {

            axiosInstance.post('account/boards/', {title: newBoard})
                .then((res)=> {
                    setSelectedBoard(res.data);
                    axiosInstance.post(`account/board/${res.data.id}/add_pin`, {id:pin.id})
                        .catch((e)=>console.log(e))
                })
                .catch((e)=>console.log(e))
        }
        else {
            axiosInstance.post(`account/board/${selectedBoard.id}/add_pin`, {id:pin.id})
                .catch((e)=>console.log(e))
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