import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    id: string,
    username: string,
    isLoggedIn: boolean,
    token: string | null,
    role: string
}

const initialState: UserState = {
    id: "",
    username: "",
    isLoggedIn: false,
    token: localStorage.getItem("authToken"),
    role: ""
}

// je déclare le slice avec reducers, actions
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setId: (state, action: PayloadAction<string>) => {
            state.id = action.payload
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
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
            localStorage.removeItem("id")
            localStorage.removeItem("username")
            state.isLoggedIn = false
            state.token = ""
            state.role = ""
        },
    }
})

export const {setId, setUsername, setToken, setIsLoggedIn, clearUser, setRole} = userSlice.actions;
