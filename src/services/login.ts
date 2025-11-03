import api from "./axiosConfig.ts";

export const loginCheck = async (username: string, password: string) => {
    return await api.get("http://localhost:8080/patients", {
        auth: {
            username: username,
            password: password
        }
    })
}
