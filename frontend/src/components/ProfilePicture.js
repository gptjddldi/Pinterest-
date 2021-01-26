import React from 'react'
import {Link} from "react-router-dom";

export default function ProfilePicture({user, size}) {
    if(user.avatar){
        return(
            <Link to={`/profile/${user.username}`}>
                <img src={user.avatar} className="rounded-full"
                style={{width: size*1.8+"em", height: size*1.8+"em"}}/>
            </Link>
        )
    }
    else if(user.username){
        const firstLetter = user.username[0]
        return(
            <Link to={`/profile/${user.username}`}>
                <div className="rounded-full bg-gray-300 font-bold grid place-items-center" style={{width: size*1.8+"em", height: size*1.8+"em"}}>
                    {firstLetter}
                </div>
            </Link>
        )
    }
    return (
        <Link to={`/profile/${user.username}`}>
            <div className="rounded-full bg-gray-300 font-bold grid place-items-center" style={{width: size*1.8+"em", height: size*1.8+"em"}}>
                U
            </div>
        </Link>
    )
}