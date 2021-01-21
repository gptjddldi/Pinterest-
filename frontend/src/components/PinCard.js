import React, {useState} from 'react'
import Card from "./Card";
import Board from "./Board";


export default function PinCard({ pin }) {

    return(
        <div className="w-full group my-10">
            <div className="relative">
                <div className="absolute px-3 mt-3 z-10 w-full invisible group-hover:visible">
                    <Board pin={pin}>Save</Board>
                </div>
                <a>
                    <Card >
                        <img className="w-full" src={pin.image}/>
                    </Card>
                </a>
            </div>
        </div>
    )
}