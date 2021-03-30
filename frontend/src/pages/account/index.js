import React from 'react'
import {Route} from "react-router-dom";
import Login from "./login";
import Signup from "./signup";

export default function AccountRoutes ({match}) {
    return(
        <div>
            <Route exact path={match.url + '/login'} component={Login}/>
            <Route exact path={match.url + '/signup'} component={Signup}/>
        </div>
    )
}