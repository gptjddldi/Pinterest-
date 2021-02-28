import React, {useEffect, useState} from 'react'
import PinCard from "./PinCard";
import Masonry from "react-masonry-css";
import {useSelector} from "react-redux";
import {axiosInstance} from "../utils/axios";
// react-masonry-css: pinterest 스타일 layout 느낌

const PostList = ({filter}) => {

    const [postList, setPostList] = useState([])
    const [loading, setLoading] = useState(false)
    const [nextCursor, setNextCursor] = useState('')
    const [moreFeeds, setMoreFeeds] = useState(false)

    const initFeed = async() => {
        setLoading(true)
        axiosInstance.get('pins/?' + (filter ? `${filter}` : '') + `&cursor=`)
            .then((res) => {
                setNextCursor(res.data.next)
                setPostList(res.data.results)
            })
            .catch((err)=>console.log(err))
        setLoading(false)
    }
    useEffect(()=>{
        initFeed()
    }, [])

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight+300 >= scrollHeight) {
            // 페이지 끝에 도달하면 추가 데이터를 받아온다
            console.log("More Feeds")
            fetchFeed();
        }
    };
    // 무한 스크롤 구현
    const fetchFeed = async() => {
        setLoading(true)
        axiosInstance.get(`${nextCursor}`)
            .then((res) => {
                setNextCursor(res.data.next)
                const fetchedPost = postList.concat(...res.data.results)
                setPostList(fetchedPost)
            })
            .catch((err)=>console.log(err))
        setLoading(false)
    }
    useEffect( () => {
        // scroll event listener 등록
        window.addEventListener("scroll", handleScroll);
        return () => {
            // scroll event listener 해제
            window.removeEventListener("scroll", handleScroll);
        };
    },)
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