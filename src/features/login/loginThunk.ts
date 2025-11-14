import {loginCheck} from "../../services/login.ts";
import {clearUser, setId, setIsLoggedIn, setRole, setToken, setUsername} from "./userSlice.ts";
import type {AppDispatch} from "../../app/store.ts";
import {setFilter, setFilteredNotes} from "../note/noteSlice.ts";
import {clearAllPatientData} from "../patient/patientThunk.ts";
import {setToast} from "../snackbar/toastSlice.ts";
import {isAxiosError} from "axios";

export const getUserToken = (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await loginCheck(username, password)

        if (response.status === 200) {
            const token = btoa(`${username}:${password}`)
            const role: string = response.data.roles[0].authority
            const id = response.data.id
            const usernameFromBackend = response.data.username

            localStorage.setItem("authToken", token)
            localStorage.setItem("role", role)
            localStorage.setItem("id", id)
            localStorage.setItem("username", usernameFromBackend)
            dispatch(setIsLoggedIn(true))
            dispatch(setToken(token))
            dispatch(setRole(role))
            dispatch(setId(id))
            dispatch(setUsername(usernameFromBackend))
        }
    } catch (error) {
        dispatch(setToast({
            open: true,
            variant: "error",
            message: isAxiosError(error) && error.response?.status === 401
                ? "Veuillez vérifier vos identifiants"
                : "Une erreur est survenue"
        }))
    }
}

export const logout = () => (dispatch:AppDispatch) => {
    try {
        dispatch(clearUser())
        dispatch(setFilter(false))
        dispatch(setFilteredNotes([]))
        dispatch(clearAllPatientData())
    } catch (error: unknown) {
            console.error(error)
    }
}