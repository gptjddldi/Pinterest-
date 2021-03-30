import React from 'react'
import SecondaryButton from "./Button/SecondaryButton";
import {axiosInstance} from "../utils/axios";

function PinDelete({pin_id}) {

    function deletePin(e) {
            axiosInstance.delete(`pins/${pin_id}`)
                .catch((e)=>console.log(e))

        }
    return (
        <form onSubmit={()=>deletePin()}>
            <SecondaryButton>삭제</SecondaryButton>
        </form>
    )
}export default PinDelete