import React from 'react'
import {Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

export default function LoginRequiredRouter({component:C, ...kwargs}) {
    const {isAuth} = useSelector(state => ({
        isAuth: state.userReducer.isAuth
    }))
    return (
        <Route {...kwargs} render={props =>
            isAuth
            ? <C {...props}/>
            : <Redirect to={{
                    pathname: '',
                    state: {from: props.location}
                }}/>

        }/>
    )
}