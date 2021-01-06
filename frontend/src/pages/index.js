import React from 'react'
import  {Route} from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Home from "./Home";

export default function Root() {
    return(
        <AppLayout>
            <Route exact path={'/'} component={Home}/>
        </AppLayout>
    )
}