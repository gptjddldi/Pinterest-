import React from 'react'
import Board from "./Board/BoardButton";
import {useSelector} from "react-redux";
import PinDelete from "./PinDelete";


export default function PinCard({pin, boards}) {
    const {loggedUser} = useSelector(state => ({
        loggedUser: state.userReducer.user
    }))

    return(
        <div className="w-full group my-10">
            <div className="relative">
                <div className="absolute px-3 mt-3 z-1 w-full invisible group-hover:visible">
                    {loggedUser.username !== pin.author ?
                        <Board pin_id={pin.id} boards={boards}>저장</Board>
                    : <PinDelete pin_id={pin.id}/>
                    }
                </div>
                    <div className={"overflow-hidden shadow-lg rounded-3xl bg-white"}>
                        <a href={`/pin/${pin.id}`}>
                            <img className="w-full" src={pin.image}/>
                        </a>
                    </div>
            </div>
        </div>
    )
}