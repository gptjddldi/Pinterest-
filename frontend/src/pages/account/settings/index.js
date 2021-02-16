import React from 'react'
import {Route} from "react-router-dom";
import AccountSetting from "./account_settings";
import ProfileEdit from "./edit_profile";

export default function SettingsRoutes ({match}, props) {
    return(
        <div>
            <Route exact path={match.url + '/account-settings'} component={AccountSetting}/>
            <Route exact path={match.url + '/edit-profile'} component={ProfileEdit}/>
        </div>
    )
}