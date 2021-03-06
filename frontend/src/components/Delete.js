import React from 'react'
import PrimaryButton from "./Button/PrimaryButton";
import SecondaryButton from "./Button/SecondaryButton";
import {axiosInstance} from "../utils/axios";

function Delete({pin_id}) {

    function deletePin(e) {
            axiosInstance.delete(`pins/${pin_id}`)
                .catch((e)=>console.log(e))

        }
    return (
        <form onSubmit={()=>deletePin()}>
            <SecondaryButton>삭제</SecondaryButton>
        </form>
    )
}export default Delete