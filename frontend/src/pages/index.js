import React from 'react'
import  {Route} from "react-router-dom";
import Layout from "../components/Layout";
import Home from "./Home";
import AccountRoutes from "./account";
import LoginRequiredRouter from "../components/routings/LoginRequiredRouter";
import CssTest from "./CssTest";
import Following from "./Following";
import Profile from "./profile";
import {useSelector} from "react-redux";
import SettingsRoutes from "./account/settings";
import Pin from "./pin/pin";
import PinCreate from "./pin/pinCreate";
import Board from "./account/Board"

export default function Root() {

    return(
        <div>
            <LoginRequiredRouter exact path={'/following'}  component={Following}/>
            <Route exact path={'/'}  component={Home}/>
            <LoginRequiredRouter exact path={'/profile/:key1'}  component={Profile}/>
            <LoginRequiredRouter exact path={'/:username/board/:boardname'} component={Board}/>
            <LoginRequiredRouter exact path={'/account'} component={AccountRoutes}/>
            <LoginRequiredRouter exact path={'/test'} component={CssTest}/>
            <LoginRequiredRouter path={'/settings'} component={SettingsRoutes}/>
            <LoginRequiredRouter exact path={'/pin/:key1'} component={Pin}/>
            <LoginRequiredRouter exact={true} path={'/pin-add'} component={PinCreate}/>
        </div>
    )
}