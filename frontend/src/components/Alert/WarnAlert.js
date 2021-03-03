import React from 'react'
import BaseAlert from "./BaseAlert";

const WarnAlert = ({children}) => {
    return(
        <BaseAlert props={"bg-red-500"}>
            <b className="capitalize">에러!</b>  {children}
        </BaseAlert>
    )
}; export default WarnAlert