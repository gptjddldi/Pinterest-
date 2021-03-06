import axios from 'axios'
import {useSelector} from "react-redux";

let item, token
if(localStorage.getItem(('persist:userReducer'))) {
    item = JSON.parse(localStorage.getItem('persist:userReducer')).userReducer
// console.log(token["userReducer"])
    token = item.split('"')[3]
}



export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
    headers: token? {Authorization: `JWT ${token}`} : ''
})
