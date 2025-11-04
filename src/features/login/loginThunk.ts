import {loginCheck} from "../../services/login.ts";
import {clearUser, setIsLoggedIn, setRole, setToken} from "./userSlice.ts";
import type {AppDispatch} from "../../app/store.ts";

export const getUserToken = (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await loginCheck(username, password)

        if (response.status === 200) {
            const token = btoa(`${username}:${password}`)
            const role: string = response.data.roles[0].authority

            localStorage.setItem("authToken", token)
            localStorage.setItem("role", role)
            dispatch(setIsLoggedIn(true))
            dispatch(setToken(token))
            dispatch(setRole(role))
        }
    } catch (error: unknown) {
        console.error(error)
    }
}

export const logout = () => (dispatch:AppDispatch) => {
    try {
        dispatch(clearUser())
    } catch (error: unknown) {
            console.error(error)
    }
}