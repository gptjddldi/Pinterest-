import React from 'react'
import Header from "./Header";

export default function Layout({props, children}) {
    return(
        <>
            <Header props={props}/>
            <div className="pt-16">
                {children}
            </div>
        </>
    )
}