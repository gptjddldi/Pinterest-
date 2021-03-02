import React, {useEffect, useRef, useState} from 'react'
import PinCard from "../components/PinCard";
import {Masonry, useInfiniteLoader} from "masonic";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import {axiosInstance} from "../utils/axios";

const CssTest = (props) => {

    const [postList, setPostList] = useState([])
    const [newPostList, setNewPostList] = useState([])
    const [loading, setLoading] = useState(false)
    const [nextCursor, setNextCursor] = useState('')
    const [moreFeeds, setMoreFeeds] = useState(false)

    const initFeed = async() => {
        setLoading(true)
        axiosInstance.get('pins/?' + `&limit=30&offset=0`)
            .then((res) => {
                console.log(res.data)
                // const cursor = res.data.next.split('=')[1]
                // setNextCursor(cursor)
                setPostList(res.data.results)
            })
            .catch((err)=>console.log(err))
        setLoading(false)
    }
    useEffect(()=>{
        if(postList.length ===0)
            initFeed()
        // console.log(postList)
    }, )

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
        axiosInstance.get('pins/?'+'author__username=park' + `&cursor=${nextCursor}`)
            .then((res) => {
                const cursor = res.data.next.split('=')[1]
                setNextCursor(cursor)
                // const fetchedPost = postList.concat(postList, res.data.results)
                setPostList([...postList, ...res.data.results])
            })
            .catch((err)=>console.log(err))
        setLoading(false)
    }
    const fetchMoreItems = async (startIndex, stopIndex, currentItems) => {
        console.log(startIndex, stopIndex)
        const nextItems = await axiosInstance(
            `/pins/?author__username=park&limit=${stopIndex - startIndex}&offset=${startIndex}`
        )
        setPostList((current) => [...current, ...nextItems.data.results])
    }
    const maybeLoadMore = useInfiniteLoader(fetchMoreItems, {
        // isItemLoaded: ((index, postList) => {
        //     console.log(postList[index]);
        //
        // }),
        minimumBatchSize:30,
        threshold: 3
    })


    return (
        <Masonry
            items={postList}
            onRender={maybeLoadMore}
            columnGutter={8}
            columnWidth={240}
            overscanBy={3}
            render={PinCard}
        />
    )
}
export default CssTest