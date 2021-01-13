import React from 'react'
import Card from "./Card";


export default function PinCard({ pin }) {

    return(
        <div className="w-full group my-10">
            <div className="relative">
                <div className="absolute px-3 mt-3 z-10 w-full invisible group-hover:visible">
                    <div className="text-gray-400 font-bold">
                        Hi {/* 핀 저장/ board 선택 여기서 함 */}
                    </div> 
                </div>
                <a>
                    <Card>
                        <img className="w-full" src={pin.image}/>
                    </Card>
                </a>
            </div>
        </div>
    )
}