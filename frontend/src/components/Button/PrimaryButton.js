import React from 'react'
import BaseButton from "./BaseButton";

export default function PrimaryButton(props){
    return(
        <BaseButton className={`font-bold ${props.className}`} color="#E60023" textColor="white" onClick={props.onClick} >
            {props.children}
        </BaseButton>
    )
}