import { $authHost, $host } from "./index";

export const fetchUslov = async (id) => {
    const {data} = await $host.get('api/uslov/'+ id)
    return data
}

export const changeUslov = async(id, cost_arend, cost_el, cost_hesh) =>{
    const {data} = await $host.patch('api/uslov/'+ id, {cost_arend: cost_arend, cost_el: cost_el, cost_hesh: cost_hesh})
    return data
}