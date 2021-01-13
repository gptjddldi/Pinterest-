import React from 'react'
import {Link} from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header(props) {
    // let { loggedUserData } = useAuth()
    return (
        <div className="fixed top-0 z-10 bg-white w-full">
            <ul className="py-3 container mx-auto flex items-center">
                <li><a href="/" className=" text-black px-4 py-2 font-bold rounded-3xl hover:bg-gray-300">홈</a></li> {/* 클릭하면 bg-black text-white */}
                <li><a href="/following" className=" text-black px-4 font-bold py-2 rounded-3xl hover:bg-gray-300">팔로잉</a></li> {/* 클릭하면 bg-black text-white */}
                <div>검색창</div>
                <li><Link href={`/profile`}><a className="text-black px-4 py-2 font-bold rounded-3xl hover:bg-gray-300">프로필</a></Link></li> {/*원래는 아이콘으로 만들어져있음*/}
                <li><Link href={`/settings`}><a className="text-black px-4 py-2 font-bold rounded-3xl hover:bg-gray-300">세팅</a></Link></li>
            </ul>
        </div>
    )
}
