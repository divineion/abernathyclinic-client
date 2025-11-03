import {loginCheck} from "../../services/login.ts";
import {setIsLoggedIn} from "./userSlice.ts";

export const getUserToken = (username: string, password: string) => async () => {
    try {
        const response = await loginCheck(username, password)

        if (response.status === 200) {
            localStorage.setItem("authToken", btoa(`${username}:${password}`))
            setIsLoggedIn(true)
        }
    } catch (error: unknown) {
        console.log("error : ", error)
    }
}