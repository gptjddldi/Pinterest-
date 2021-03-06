import React, {useEffect, useState} from 'react'
import PinCard from "./PinCard";
import {useDispatch, useSelector} from "react-redux";
import {axiosInstance} from "../utils/axios";
import {cursor} from "../actions/userAction";
import SecondaryButton from "./Button/SecondaryButton";
import Masonry from "react-masonry-css";
// react-masonry-css: pinterest 스타일 layout 느낌

const PostList = ({filter, url}) => {

    const [postList, setPostList] = useState([])
    const [nextCursor, setNextCursor] = useState('')
    const [prevCursor, setPrevCursor] = useState('')

    const curCursor = useSelector(state => ({
        curCursor: state.userReducer.cursor
    }))
    const dispatch = useDispatch()
    const onCursor = (data) => dispatch(cursor(data));

    const initFeed = async(cursorTo) => {
        if(url){
            axiosInstance.get(`pins/${url}/?`)
                .then((res) => {
                    setNextCursor(res.data.next)
                    setPrevCursor(res.data.previous)

                    if(res.data.results)
                        setPostList(res.data.results)
                    else
                        setPostList(res.data)

                })
                .catch((err)=>console.log(err))
        }
        else if(filter){
            axiosInstance.get(`pins/?${filter}&`)
                .then((res) => {
                    setNextCursor(res.data.next)
                    setPrevCursor(res.data.previous)

                    if(res.data.results)
                        setPostList(res.data.results)
                    else
                        setPostList(res.data)

                })
                .catch((err)=>console.log(err))
        }
        else{
            axiosInstance.get(`pins/?`)
                .then((res) => {
                    setNextCursor(res.data.next)
                    setPrevCursor(res.data.previous)

                    if(res.data.results)
                        setPostList(res.data.results)
                    else
                        setPostList(res.data)

                })
                .catch((err)=>console.log(err))
        }

    }
    useEffect(()=>{
        initFeed(curCursor.curCursor)
    }, [])

    const fetchFeed = async(cursorTo) => {
        axiosInstance.get(`${cursorTo}`)
            .then((res) => {
                setNextCursor(res.data.next)
                setPrevCursor(res.data.previous)

                setPostList(res.data.results)
            })
            .catch((err)=>console.log(err))
        scrollToTop()
        onCursor(cursorTo)
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        })
    }

    const RenderItems = () => {
        return(
            <Masonry
                breakpointCols={{default: 5, 1280: 4, 1024: 3, 768: 2, 640: 1}}
                className="container mx-auto flex"
                columnClassName="mx-2"
            >
                {postList.map((pin, index) =>
                    <PinCard className="my-10" pin={pin} key={index}/>
                )}
            </Masonry>
        )}

    return(
        <div>
            <div>
                {postList ? <RenderItems/> : <div>로딩중</div> }
            </div>
            <div className=" fixed right-0 bottom-0 mb-5 mr-5 flex z-10">
                {prevCursor ? <>
                        <SecondaryButton className="px-4 py-2 rounded-3xl ml-auto " onClick={() =>fetchFeed(prevCursor)}>이전</SecondaryButton>
                        <SecondaryButton className="px-4 py-2 rounded-3xl ml-auto " onClick={() => fetchFeed(nextCursor)}>다음</SecondaryButton></>
                    :
                    <SecondaryButton className="px-4 py-2 rounded-3xl ml-auto" onClick={() => fetchFeed(nextCursor)}>다음</SecondaryButton>
                }
            </div>
        </div>
    )
}
export default React.memo(PostList)