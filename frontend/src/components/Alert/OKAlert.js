import React from 'react'
import BaseAlert from "./BaseAlert";

const WarnAlert = ({children}) => {
    return(
        <BaseAlert props={"bg-green-500"}>
            <b className="capitalize">확인</b>  {children}
        </BaseAlert>
    )
}; export default WarnAlert