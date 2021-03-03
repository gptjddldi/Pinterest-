import React, {useEffect, useRef, useState} from 'react'
import PinCard from "../components/PinCard";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import {axiosInstance} from "../utils/axios";
import Masonry from "react-masonry-css";
import SecondaryButton from "../components/Button/SecondaryButton";
import {useDispatch, useSelector} from "react-redux";
import {cursor} from "../actions/userAction";

const CssTest = (props) => {

    const [postList, setPostList] = useState([])
    const [nextCursor, setNextCursor] = useState('')
    const [prevCursor, setPrevCursor] = useState('')

    const curCursor = useSelector(state => ({
        curCursor: state.userReducer.cursor
    }))
    const dispatch = useDispatch()
    const onCursor = (data) => dispatch(cursor(data));

    const initFeed = async(cursorTo) => {
        axiosInstance.get(cursorTo? `${cursorTo.curCursor}` : 'pins/?' + `&cursor=`)
            .then((res) => {
                setNextCursor(res.data.next)
                setPrevCursor(res.data.previous)
                setPostList(res.data.results)
            })
            .catch((err)=>console.log(err))
    }
    useEffect(()=>{
        initFeed(curCursor)
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
export default CssTest