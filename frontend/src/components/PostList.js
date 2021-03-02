import React, {useEffect, useState} from 'react'
import PinCard from "./PinCard";
import {useSelector} from "react-redux";
import {axiosInstance} from "../utils/axios";
import {Masonry, useInfiniteLoader} from "masonic";
// react-masonry-css: pinterest 스타일 layout 느낌

const PostList = ({filter}) => {

    const [postList, setPostList] = useState([])
    const [newPostList, setNewPostList] = useState([])
    const [loading, setLoading] = useState(false)
    const [nextCursor, setNextCursor] = useState('')
    const [moreFeeds, setMoreFeeds] = useState(false)

    const initFeed = async() => {
        setLoading(true)
        axiosInstance.get('pins/?' + (filter ? `${filter}` : '') + `&cursor=`)
            .then((res) => {
                const cursor = res.data.next.split('=')[1]
                setNextCursor(cursor)
                setPostList(res.data.results)
            })
            .catch((err)=>console.log(err))
        setLoading(false)
    }
    useEffect(()=>{
        initFeed()
    }, [])

    // const handleScroll = () => {
    //     const scrollHeight = document.documentElement.scrollHeight;
    //     const scrollTop = document.documentElement.scrollTop;
    //     const clientHeight = document.documentElement.clientHeight;
    //     if (scrollTop + clientHeight+300 >= scrollHeight) {
    //         // 페이지 끝에 도달하면 추가 데이터를 받아온다
    //         console.log("More Feeds")
    //         fetchFeed();
    //     }
    // };
    // 무한 스크롤 구현
    const fetchFeed = async() => {
        setLoading(true)
        axiosInstance.get('pins/?' + (filter ? `${filter}` : '') + `&cursor=${nextCursor}`)
            .then((res) => {
                const cursor = res.data.next.split('=')[1]
                setNextCursor(cursor)
                // const fetchedPost = postList.concat(postList, res.data.results)
                setPostList([...postList, ...res.data.results])
            })
            .catch((err)=>console.log(err))
        setLoading(false)
    }
    const maybeLoadMore = useInfiniteLoader(fetchFeed, {
        // isItemLoaded: (index, postList) => !!postList[index],
        threshold: 3
    })


    return (
            <Masonry
            // className="my-4"
            items={postList}
            onRender={maybeLoadMore}
            columnGutter={8}
            columnWidth={240}
            overscanBy={3}
            render={PinCard}
            />
    )
}
export default React.memo(PostList)