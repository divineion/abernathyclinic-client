import { configureStore } from '@reduxjs/toolkit'
import {patientSlice} from "../features/patient/patientSlice";
import {userSlice} from "../features/login/userSlice.ts";
import {noteSlice} from "../features/note/noteSlice.ts";
import {toastSlice} from "../features/snackbar/toastSlice.ts";


export const store = configureStore({
    reducer: {
        patients: patientSlice.reducer,
        user: userSlice.reducer,
        notes: noteSlice.reducer,
        toast: toastSlice.reducer
    }
})

// j'exporte les types
// le store sera de type AppStore - servira de base pour créer le type AppDispatch
export type AppStore = typeof store;
// le state global de type RootState --> ce qui permet de le typer dans le composant
// qui attend un type pour accéder au state avec useSelector
export type RootState = ReturnType<typeof store.getState>
//le type de dispatch --> permet de fournir un type en déclarant un useDispatch
export type AppDispatch = AppStore["dispatch"]

export default store