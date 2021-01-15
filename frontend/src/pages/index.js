import React from 'react'
import  {Route} from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Layout from "../components/Layout";
import Home from "./Home";
import AccountRoutes from "./account";
import LoginRequiredRouter from "../components/routings/LoginRequiredRouter";
import CssTest from "./CssTest";
import Following from "./Following";
import Profile from "./account/profile";

export default function Root() {
    return(
        <div>
            <Route exact path={'/'} component={Home}/>
            <Route exact path={'/following'} component={Following}/>
            <Route exact path={'/profile'} component={Profile}/>
            <Route path={'/account'} component={AccountRoutes}/>
            <Route path={'/test'} exact component={CssTest}/>
        </div>
    )
}