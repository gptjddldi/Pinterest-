import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Image} from "antd";
import PinCard from "./PinCard";
import Masonry from "react-masonry-css";
import {useSelector} from "react-redux";
// react-masonry-css: pinterest 스타일 layout 느낌
// const apiRoot = 'http://localhost:8000/pins/'
const boardRoot = 'http://localhost:8000/account/boards/'

const PostList = ({filter}) => {
    const {token} = useSelector((state) => ({
        token: state.userReducer.token
    }))
    const [postList, setPostList] = useState([])

    useEffect( () => {
        render()
        // fn()
    }, [])

    async function render() {
        try{
            const headers = {Authorization: `JWT ${token}`}
            const res = await axios.get(`http://localhost:8000/pins/?${filter}`, {headers})
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
                    <a href={`http://localhost:3000/pin/${pin.id}`}><PinCard className="my-10" pin={pin} key={index}/></a>
                )}
            </Masonry>
        </div>
    )
}
export default React.memo(PostList)