import React, {useEffect, useState} from 'react'
import WarnAlert from "../components/Alert/WarnAlert";
import OKAlert from "../components/Alert/OKAlert";
import {axiosInstance} from "../utils/axios";
import Masonry from "react-masonry-css";
import PinCard from "../components/PinCard";

const CssTest = (props) => {
    const [postList, setPostList] = useState([])
    const initFeed = async(cursorTo) => {
        console.log("로딩중..")
        const data = await axiosInstance.get('/pins/13/sim_pin_list/')
            .then((res) => (setPostList(res.data))).catch((err)=>console.log(err))
        console.log("완료!")
    }
    useEffect(()=>{
        initFeed()
    }, [])
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
            {postList ? <RenderItems/> : <div>로딩중</div> }
            
        </div>
    )
}
export default CssTest