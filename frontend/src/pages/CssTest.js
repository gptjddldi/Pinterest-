import React from 'react'

export default function cssTest() {
    return(
        <div className="group p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 ">
            <div>
                <div className="text-xl font-medium text-black group-hover:bg-red-500 ">ChitChat</div>
                <p className="text-gray-500">You have a new message!</p>
            </div>
            <button className="bg-red-500 hover:bg-red-700 ...">
                Hover me
            </button>
        </div>
    )
}