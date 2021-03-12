import React, {useEffect, useState} from "react";
import PrimaryButton from "./Button/PrimaryButton";
import SecondaryButton from "./Button/SecondaryButton";
import FollowTagButton from "./FollowButton/FollowTagButton";

export default function Tabs(pin_tags){
    const [tags, setTags] = useState([])
    // console.log((pin_tags.pin_tags).map(item =>(Object.entries(item).map((key, value) => value)) ))
    // for (let tag_name in pin_tags){
    //     console.log(pin_tags[tag_name])
    // }
    useEffect(() => {
        console.log(pin_tags.pin_tags)
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
