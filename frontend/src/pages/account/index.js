import React from 'react'
import {Route} from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Profile from "./profile";

export default function AccountRoutes ({match}) {
    return(
        <div>
            <Route exact path={match.url + '/login'} component={Login}/>
            <Route exact path={match.url + '/signup'} component={Signup}/>
            <Route exact path={match.url + '/profile'} component={Profile}/>
        </div>
    )
}