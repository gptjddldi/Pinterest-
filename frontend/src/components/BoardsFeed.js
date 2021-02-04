import React from 'react'

function getBoardDisplayImage(board){
    if(board.pin.length >= 1)
        return board.pin[0].image
    return 123
}

export default function BoardsFeed({ boards, username }){
    return (
        <div className="flex flex-wrap">

            {boards && boards.map((board, index) => (
                <div key={index} className="mx-5">
                    <div href={`/${username}/${board.id}` }>
                        <a>
                            <div className="rounded-xl overflow-hidden bg-gray-300 w-64 h-32" >
                                <img className="w-full" src={getBoardDisplayImage(board)} />
                            </div>
                        </a>
                    </div>
                    <div href={`/${username}/${board.id}`}><a><h3 className="text-xl font-bold">{board.title}</h3></a></div>
                    <div>{board.pin.length} pins</div>
                </div>
            ))}
        </div>
    );
}
