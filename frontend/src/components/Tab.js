import React, {useEffect, useState} from "react";
import FollowTagButton from "./FollowButton/FollowTagButton";

export default function Tabs(pin_tags){
    const [tags, setTags] = useState([])
    useEffect(() => {
        setTags(pin_tags.pin_tags)
    }, [tags, pin_tags])
    if(tags && tags.length>=0) {
        return (
            <div>
                <ul className="flex">
                    {tags.map((tag, index) => (
                        <FollowTagButton tag={tag} key={index}/>
                    ))}

                </ul>
            </div>
        )
    }
    else
        return(
            <div>로딩즁..</div>
        )
}
