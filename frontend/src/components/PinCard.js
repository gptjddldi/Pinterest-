import React, {useEffect, useState} from 'react'
import Card from "./Card";
import Board from "./Board/Board";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import Delete from "./Delete";
import {axiosInstance} from "../utils/axios";


export default function PinCard({pin, boards}) {
    const {loggedUser} = useSelector(state => ({
        loggedUser: state.userReducer.user
    }))
    // const [boards, setBoards] = useState()
    // useEffect(()=> {
    //
    //     axiosInstance(`boards/?author__username=${loggedUser.username}`).then((res) => setBoards(res.data))
    //         .catch((e) => console.log(e));
    // }, [])
    return(
        <div className="w-full group my-10">
            <div className="relative">
                <div className="absolute px-3 mt-3 z-1 w-full invisible group-hover:visible">
                    {loggedUser.username !== pin.author ?
                        <Board pin_id={pin.id} boards={boards}>저장</Board>
                    : <Delete pin_id={pin.id}/>
                    }
                </div>
                    <Card >
                        <a href={`/pin/${pin.id}`}>
                            <img className="w-full" src={pin.image}/>
                        </a>
                    </Card>
            </div>
        </div>
    )
}