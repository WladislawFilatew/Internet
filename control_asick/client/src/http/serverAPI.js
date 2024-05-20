import { $authHost, $host } from "./index";

export const fetchServer = async (id) => {
    const {data} = await $host.get('api/server/'+ id)
    return data
}