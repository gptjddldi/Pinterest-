import React, {useEffect, useRef, useState} from 'react'
import PinCard from "../components/PinCard";
import {axiosInstance} from "../utils/axios";
import {Masonry, useInfiniteLoader} from "masonic";

const CssTest = (props) => {
    const [postList, setPostList] = useState([])
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [nextCursor, setNextCursor] = useState('')

    const initFeed = async() => {
        axiosInstance.get('pins/?' + `&cursor=`)
            .then((res) => {
                setNextCursor(res.data.next)
                setPostList(res.data.results)
            })
            .catch((err)=>console.log(err))

    }
    useEffect(()=>{
        initFeed()
    }, [])

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
    const maybeLoadMore = useInfiniteLoader(fetchFeed, {
        isItemLoaded: (index, postList) => !!postList[index],
        minimumBatchSize: 30,
        threshold: 3
    })


    return <Masonry
        items={postList}
        onRender={maybeLoadMore}
        columnGutter={8}
        columnWidth={240}
        overscanBy={2}
        render={PinCard}
    />
}

export default CssTest