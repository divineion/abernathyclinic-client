import axios from "axios";
import store from "../app/store.ts";

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

// intercepteur qui sera exécuté avant chaque requête
// You can intercept requests or responses before they are handled by then or catch.
// instance.interceptors.request.use(function () {/*...*/});
api.interceptors.request.use(function (config){
    const token = store.getState().user.token
    if (token !== "") {
        config.headers.Authorization = `Basic ${token}`
    }

    return config
})

export default api;