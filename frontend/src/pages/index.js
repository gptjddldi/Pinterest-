import React from 'react'
import  {Route} from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Layout from "../components/Layout";
import Home from "./Home";
import AccountRoutes from "./account";
import LoginRequiredRouter from "../components/routings/LoginRequiredRouter";
import CssTest from "./CssTest";

export default function Root() {
    return(
        <div>
            <Route exact path={'/'} component={Home}/>
            <Route path={'/account'} component={AccountRoutes}/>
            <Route path={'/test'} exact component={CssTest}/>
        </div>
    )
}