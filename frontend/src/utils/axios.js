// import Axios from 'axios'
// const apiRoot = "http://localhost:8000/account/login/"
//
// export const request = (method, url, data) => {
//     async function fn() {
//         const {email, password} = values;
//         const data = {email, password}
//         try{
//             console.log(data)
//             const response = await Axios.method(apiRoot, data)
//             console.log(response)
//             setVisible(false)
//         }
//         catch (err){
//             console.log(err)
//         }
//     }
//     return fn();
//     return axios({
//         method,
//         url: DOMAIN + url,
//         data,
//     })
//         .then((res) => res.data)
//         .catch((err) => console.log(err));
// }