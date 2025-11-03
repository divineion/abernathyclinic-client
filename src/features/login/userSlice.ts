import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    isLoggedIn: boolean,
    token: string | null
}

const initialState: UserState = {
    isLoggedIn: false,
    token: localStorage.getItem("authToken")
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
        clearToken: (state) => {
            localStorage.removeItem("authToken")
            state.token = ""
        }
    }
})

export const {setToken, setIsLoggedIn, clearToken} = userSlice.actions;
