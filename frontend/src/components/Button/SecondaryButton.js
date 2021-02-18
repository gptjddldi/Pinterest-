import React from 'react'
import BaseButton from "./BaseButton";

export default function SecondaryButton(props){
    return(
        <BaseButton className={`font-bold ${props.className}`} color="#EFEFEF" textColor="#000000" onClick={props.onClick} >
            {props.children}
        </BaseButton>
    )
}