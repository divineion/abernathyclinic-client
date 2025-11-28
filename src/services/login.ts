import api from "./axiosConfig.ts";
import {GET_USER_INFO_ROUTE} from "../utils/apiRoutes.ts";

export const loginCheck = (username: string, password: string) => {
    return api.get(GET_USER_INFO_ROUTE, {
        auth: {
            username: username,
            password: password
        }
    })
}
