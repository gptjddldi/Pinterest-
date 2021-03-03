import React from 'react'
import {Link} from "react-router-dom";

function getBoardDisplayImage(board){
    if(board.pin.length >= 1)
        return board.pin[0].image
}

export default function BoardsFeed({ boards, username }){
    return (
        <div className="flex flex-wrap">

            {boards && boards.map((board, index) => (
                <div key={index} className="mx-5">
                    <a href={`/${username}/board/${board.title}/`}>
                        <div className="rounded-xl overflow-hidden bg-gray-300 w-64 h-32" >
                            <img className="w-full" src={getBoardDisplayImage(board)} />
                        </div>
                    </a>
                        <h3 className="text-xl font-bold">{board.title}</h3>
                    <div>{board.pin.length} pins</div>
                </div>
            ))}
        </div>
    );
}
