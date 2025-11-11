import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {MinimalPatient, Patient} from "./types";

//depuis le composant je définis l'UI, je disoatche les appels async, je récup le state à jour

//1. déclarer le type Patient
// --> types/index.ts

// 2. initialiser le state Patient
interface PatientState {
    patients: MinimalPatient[],
    selectedPatient: Patient | null,
}

const initialState: PatientState = {
    patients: [],
    selectedPatient: null
}

// les slices contiennent state, reducers et actions
// donc ici je déclare les reducers
export const patientSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        setPatients: (state, action: PayloadAction<MinimalPatient[]>) => {
            state.patients = action.payload
        },
        setPatient: (state, action: PayloadAction<Patient>) => {
            state.selectedPatient = action.payload
        },
        clearPatient: (state) => {
            state.selectedPatient = null
        }
    }
})

// 4. j'exporte les actions pour pouvoir les use dans les components
export const { setPatient, setPatients, clearPatient } =  patientSlice.actions

// 5. j'exporte le reducer pour pouvoir l'utiliser dans le store
export default patientSlice.reducer
