import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    isLoggedIn: boolean,
    token: string | null,
    role: string
}

const initialState: UserState = {
    isLoggedIn: false,
    token: localStorage.getItem("authToken"),
    role: ""
}

// je déclare le slice avec reducers, actions
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        setRole: (state, action: PayloadAction<string>) => {
            state.role = action.payload
        },
        clearUser: (state) => {
            localStorage.removeItem("authToken")
            localStorage.removeItem("role")
            state.isLoggedIn = false
            state.token = ""
            state.role = ""
        },
    }
})

export const {setToken, setIsLoggedIn, clearUser, setRole} = userSlice.actions;
