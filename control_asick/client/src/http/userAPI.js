import { $authHost, $host } from "./index";
import {jwtDecode as jwt_decode} from 'jwt-decode';

export const registration = async (email,password) => {
    const {data} = await $host.post('api/user/registration', {email,password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email,password) => {
    const {data} = await $host.post('api/user/login', {email,password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}


export const fetchUser = async (id) => {
    const {data} = await $host.get('api/user/'+ id)
    return data
}

export const changeUser = async(id, nikname, email) =>{
    const {data} = await $host.patch('api/user/'+ id, {nikname: nikname, email: email})
    return data
}