import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Image} from "antd";
import PinCard from "./PinCard";
import Masonry from "react-masonry-css";
// react-masonry-css: pinterest 스타일 layout 느낌
const apiRoot = 'http://localhost:8000/pins/'

const PostList = () => {

    const [postList, setPostList] = useState([])

    useEffect( () => {
        render()
    }, [])

    async function render() {
        try{
            const res = await axios.get(apiRoot)
            const {data} = res
            setPostList(data)
        }
        catch (err){
            console.log(err)
        }
    }
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
export default PostList