import React, {useState} from 'react'
import {Link} from "react-router-dom";
import SearchBar from "./SearchBar";
import {useSelector} from "react-redux";

export default function Header(props) {
    console.log(">>", props.props.location.pathname)

    // let page = props.match.params.key1;
    let [currentPageButton, setCurrentPageButton] = useState()
    let {username} = useSelector(state => ({
        username: state.userReducer.user.username
    }))

    return (
        <div className="fixed top-0 z-10 bg-white w-full">
            <ul className="py-3 container mx-auto flex items-center">
                {props.props.location.pathname === '/' ?
                    <>
                    <li><Link to="/" className=" text-white px-4 py-2 font-bold rounded-3xl bg-black hover:text-white">홈</Link></li>
                    <li><Link to="/following" className=" text-black px-4 font-bold py-2 rounded-3xl hover:bg-gray-300 hover:text-black">팔로잉</Link></li>
                    </>
                :   <>
                    <li><Link to="/" className=" text-black px-4 font-bold py-2 rounded-3xl hover:bg-gray-300 hover:text-black">홈</Link></li>
                    <li><Link to="/following" className=" text-white px-4 py-2 font-bold rounded-3xl bg-black hover:text-white">팔로잉</Link></li>
                    </>
                }

                <div>검색창</div>
                <li><Link to={`/profile/${username}`} className="text-black px-4 py-2 font-bold rounded-3xl hover:bg-gray-300">프로필</Link></li> {/*원래는 아이콘으로 만들어져있음*/}
                <li><Link to={`/settings/edit-profile`} className="text-black px-4 py-2 font-bold rounded-3xl hover:bg-gray-300">세팅</Link></li>
            </ul>
        </div>
    )
}
