import React from 'react'
import  {Route} from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Home from "./Home";
import AccountRoutes from "./account";

export default function Root() {
    return(
        <AppLayout>
            <Route exact path={'/'} component={Home}/>
            <Route path={'/account'} component={AccountRoutes}/>
        </AppLayout>
    )
}