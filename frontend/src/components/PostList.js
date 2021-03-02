import React, {useEffect, useState} from 'react'
import PinCard from "./PinCard";
import {useSelector} from "react-redux";
import {axiosInstance} from "../utils/axios";
import {Masonry, useInfiniteLoader} from "masonic";
// react-masonry-css: pinterest 스타일 layout 느낌

const PostList = ({filter}) => {
    const [fakeItems, setFakeItems] = useState([])
    const [startIndex, setStartIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    const [nextCursor, setNextCursor] = useState('')
    const [moreFeeds, setMoreFeeds] = useState(false)

    const fetchFeed = (startIdx=0) => {
        setLoading(true)
        axiosInstance.get('pins/?' + (filter ? `${filter}` : '') + `&limit=32&offset=${startIdx}`)
            .then((res) => {
                // if(res.data.next)
                //     setStartIndex(startIdx+32)
                // console.log(res.data.results)
                setFakeItems(res.data.results)
                console.log(fakeItems)
                return fakeItems
            })
            .catch((err)=>console.log(err))
        // setLoading(false)
        // console.log(fakeItems)
        // return fakeItems
    }
    const [postList, setPostList] = useState(fetchFeed)
    console.log(postList)
    // const fetchFeedPromise = (startIdx) => {
    //     Promise.resolve(fetchFeed(startIdx))
    // }

    // const fetchFeed = async() => {
    //     setLoading(true)
    //     axiosInstance.get('pins/?' + (filter ? `${filter}` : '') + `&cursor=${nextCursor}`)
    //         .then((res) => {
    //             if(res.data.next)
    //                 setNextCursor(res.data.next.split('=')[1])
    //             // const fetchedPost = postList.concat(postList, res.data.results)
    //             // setPostList(fetchedPost)
    //             setPostList([...postList, ...res.data.results])
    //             console.log(postList)
    //         })
    //         .catch((err)=>console.log(err))
    //     setLoading(false)
    // }
    // const maybeLoadMore = useInfiniteLoader(
    //     async (startIndex, stopIndex, postList) => {
    //         const nextItems = await fetchFeedPromise(startIndex);
    //         setPostList(current => [...current, ...nextItems])
    //     }, {
    //     isItemLoaded: (index, postList) => !!postList[index],
    //     minimumBatchSize: 32,
    //     threshold: 3
    // })


    return (
        <div>123</div>
            // <Masonry
            // // className="my-4"
            // items={postList}
            // onRender={maybeLoadMore}
            // columnGutter={8}
            // columnWidth={240}
            // overscanBy={1.75}
            // render={PinCard}
            // />
    )
}
export default React.memo(PostList)