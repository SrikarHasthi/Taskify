import axios from "axios";

export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8081'
    }
)

export const retrieveTodos = () => {
    let data = apiClient.get('/hello-world-bean').then((res)=>{
        return res;
    }).catch((err)=>{
        console.log(err);
    })
    return data
}


export const executeBasicAuthentication = (token: string) => {
    let data = apiClient.get('/todoss', {
        headers: {
            Authorization: token
        }
    }).then((res)=>{
        return res;
    }).catch((err)=>{
        console.error(err);
    })
    return data
}


