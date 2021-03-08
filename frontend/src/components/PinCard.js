import React, {useState} from 'react'
import Card from "./Card";
import Board from "./Board/Board";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import Delete from "./Delete";


export default function PinCard({pin}) {
    const {loggedUser} = useSelector(state => ({
        loggedUser: state.userReducer.user
    }))
    return(
        <div className="w-full group my-10">
            <div className="relative">
                <div className="absolute px-3 mt-3 z-1 w-full invisible group-hover:visible">
                    {loggedUser.username !== pin.author ?
                        <Board pin_id={pin.id}>Save</Board>
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