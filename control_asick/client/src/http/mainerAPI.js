import { $authHost, $host } from "./index";

export const fetchMainers = async (serverId) => {
    const {data} = await $host.get('api/mainer/' , {params: {serverId}})
    return data
}

export const changeMainer = async (id, pole,value) => {
    const {data} = await $authHost.patch('api/mainer/' + id, {pole: pole, value: value})
    return data
}

export const imgMainer = async(id, mainer) => {
    const {data} = await $authHost.patch('api/mainer/' + id, mainer)
    return data
}

export const delMainer = async(id) =>{
    const {data} = await $authHost.delete('api/mainer/' + id)
    return data
}

export const addMainer = async(serverId) => {
    const {data} = await $host.post('api/mainer', {name: "Mainer", serverId: serverId})
    return data
}

export const getGraf = async(mainerId) => {
    const {data} = await $host.get('api/mainer/graf/' + mainerId)
    return data
}