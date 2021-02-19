import React, {useEffect, useState} from 'react'
import PinCard from "./PinCard";
import Masonry from "react-masonry-css";
import {useSelector} from "react-redux";
import {axiosInstance} from "../utils/axios";
// react-masonry-css: pinterest 스타일 layout 느낌

const PostList = ({filter}) => {

    const [postList, setPostList] = useState([])

    useEffect( () => {
        axiosInstance.get(filter ? `${filter}` : 'pins/')
            .then((res) => setPostList(res.data))
            .catch((err)=>console.log(err))
    }, [])

    // 무한 스크롤 구현

    return(
        <div>
            <Masonry
                breakpointCols={{default: 5, 1280: 4, 1024: 3, 768: 2, 640: 1}}
                className="container mx-auto flex"
                columnClassName="mx-2"
            >
                {postList.map((pin, index) =>
                    <PinCard className="my-10" pin={pin} key={index}/>
                )}
            </Masonry>
        </div>
    )
}
export default React.memo(PostList)