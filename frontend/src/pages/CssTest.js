import React, {useRef, useState} from 'react'
import axios from "axios";

import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import PrimaryButton from "../components/Button/PrimaryButton";


export default function PinCreate(props){
    const {token} = useSelector(state => ({
        token: state.userReducer.token,
    }))

    return (
        <div>
            <PrimaryButton>Button</PrimaryButton>
        </div>
    )
}