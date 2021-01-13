import React from 'react'
import Header from "./Header";

export default function Layout({children}) {
    return(
        <>
            <Header/>
            <div className="pt-16">
                {children}
            </div>
        </>
    )
}