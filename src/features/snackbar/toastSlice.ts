import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {AlertColor} from '@mui/material/Alert';
export interface Toast {
    open: boolean,
    message: string,
    variant: AlertColor
}
interface ToastState {
    toast: Toast
}

const initialState: ToastState = {
    toast: {
        open: false,
        message: "",
        variant: "info"
    }
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToast: (state, action: PayloadAction<Toast>) => {
            state.toast = action.payload
        },
        closeToast: (state) => {
            state.toast.open = false
        }
    }
});

export const {setToast, closeToast} = toastSlice.actions

export default toastSlice.reducer