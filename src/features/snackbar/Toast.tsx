import {useDispatch, useSelector} from "react-redux"
import type {RootState} from "../../app/store.ts"
import {useEffect, useRef} from "react"
import Snackbar from '@mui/material/Snackbar'
import {closeToast} from "./toastSlice.ts"
import {Fade} from "@mui/material"
import Alert from '@mui/material/Alert';


const Toast = () => {
    const {open, message, variant} = useSelector((state: RootState) => state.toast.toast)

    const toastRef = useRef<HTMLDivElement>(null)

    const dispatch = useDispatch()

    useEffect(() => {
        if (open && toastRef.current) {
            toastRef.current.focus()
        }
    }, [open]);
    const handleCloseClick = ()=> {
        dispatch(closeToast())
    }

    return (
        <>
            <Snackbar
                open={open}
                slots={{ transition: Fade }}
                autoHideDuration={6000}
                onClose={handleCloseClick}
            >
                <Alert
                    // permettre aux lecteurs d'écran de lire immédiatement le msg
                    aria-atomic="true" // pour que le message soit lu d'un bloc
                    role={"alert"}
                    aria-live="assertive"
                    ref={toastRef}
                    tabIndex={-1} //donner le focus au div sans qu’il soit accessible au tab normal
                    onClose={handleCloseClick}
                    severity={variant}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Toast