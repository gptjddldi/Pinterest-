import React, {useState} from 'react'
import {Link} from "react-router-dom";
import SearchBar from "./SearchBar";
import {useSelector} from "react-redux";

export default function Header(props) {

    let [dropdownVisibility, setDropdownVisibility] = useState("hidden")
    let {username} = useSelector(state => ({
        username: state.userReducer.user.username
    }))

    const dropDownHandler = () => {
        if(dropdownVisibility === "hidden") setDropdownVisibility("bolck")
        else setDropdownVisibility("hidden")
    }

    return (
        <div className="fixed top-0 z-10 bg-white w-full">
            <ul className="py-3 container mx-auto flex items-center">
                {props.props.location.pathname === '/following' ?
                    <>
                        <li><Link to="/" className=" text-black px-4 font-bold py-2 rounded-3xl hover:bg-gray-300 hover:text-black">홈</Link></li>
                        <li><Link to="/following" className=" text-white px-4 py-2 font-bold rounded-3xl bg-black hover:text-white">팔로잉</Link></li>
                    </>
                :
                    <>
                        <li><Link to="/" className=" text-white px-4 py-2 font-bold rounded-3xl bg-black hover:text-white">홈</Link></li>
                        <li><Link to="/following" className=" text-black px-4 font-bold py-2 rounded-3xl hover:bg-gray-300 hover:text-black">팔로잉</Link></li>
                    </>
                }

                <div className={"w-3/4 text-center font-bold"}>검색창</div>
                <li><Link to={`/profile/${username}`} className="inline-block no-underline rounded-3xl text-black hover:bg-gray-300">
                        <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24"
                             height="24" viewBox="0 0 24 24">
                            <circle fill="none" cx="12" cy="5" r="3"/>
                            <path
                                d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z"/>
                        </svg>
                </Link></li>
                <div className="relative">
                    <button className="relative z-10 block rounded-3xl bg-white p-2 focus:outline-none hover:bg-gray-300" onClick={dropDownHandler}>
                        <svg className="h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <div className={`absolute right-0 mt-2 py-2 w-32 bg-white rounded-md shadow-xl z-20 ${dropdownVisibility}`}>
                    <Link to="/settings/edit-profile" className="block text-black px-4 py-2 font-bold rounded-3xl hover:bg-gray-300 hover:text-black">
                        프로필 수정
                    </Link>
                    <Link to="/settings/account-settings" className="block text-black px-4 py-2 font-bold rounded-3xl hover:bg-gray-300 hover:text-black">
                        계정 설정
                    </Link>
                    <Link to="#" className="block text-black px-4 py-2 font-bold rounded-3xl hover:bg-gray-300 hover:text-black">
                        로그아웃
                    </Link>
                    </div>
                </div>
            </ul>
        </div>
    )
}
