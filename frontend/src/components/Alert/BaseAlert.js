import React from 'react'

const BaseAlert = ({props, children}) => {
    // bg-color, border-color, text-color 을 잘 쓰면 됨
    // 경고 : bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4
    // 승인 :
    return (
        <div className={`max-w-md fixed top-0 right-0 mr-5 mt-5 z-10 rounded-xl bg-white shadow-lg 
            pl-2 pr-8 py-2 ${props}`}>

            <span className="inline-block align-middle mr-8">
                {children}
            </span>
            <button
                className="absolute bg-transparent text-2xl object-center leading-none right-0
                bottom-0 mt-4 mr-6 outline-none focus:outline-none">
                <span>×</span>
            </button>
        </div>
    )
}; export default BaseAlert