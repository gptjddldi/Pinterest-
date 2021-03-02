import React, {useState} from 'react'
import Card from "./Card";
import Board from "./Board/Board";
import {Link} from "react-router-dom";


export default function PinCard({ index, data:{id, name, image}, width }) {

    return(
        <div className="w-full group">
            <div className="relative">
                <div className="absolute px-3 mt-3 z-1 w-full invisible group-hover:visible">
                    <Board pin_id={id}>Save</Board>
                </div>
                    <Card >
                        <a href={`/pin/${id}`}>
                            <img className="w-full" src={image}/>
                        </a>
                    </Card>
            </div>
        </div>
    )
}