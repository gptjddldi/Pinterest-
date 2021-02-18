import React, {useRef, useState} from 'react'
import axios from "axios";

import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import PrimaryButton from "../components/Button/PrimaryButton";


export default function PinCreate(props){
    let item = {}
    item = JSON.parse(localStorage.getItem('persist:userReducer')).userReducer
    // console.log(token["userReducer"])
    console.log(item.split('"')[3])
    const token = item.split('"')[3]

    return (
        <div>
            <PrimaryButton>Button</PrimaryButton>
        </div>
    )
}

