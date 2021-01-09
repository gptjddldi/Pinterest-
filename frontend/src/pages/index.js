import React from 'react'
import  {Route} from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Home from "./Home";
import AccountRoutes from "./account";
import LoginRequiredRouter from "../components/routings/LoginRequiredRouter";

export default function Root() {
    return(
        <AppLayout>
            <LoginRequiredRouter exact path={'/'} component={Home}/>
            <Route path={'/account'} component={AccountRoutes}/>
        </AppLayout>
    )
}