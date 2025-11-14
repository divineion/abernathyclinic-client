import type {AppDispatch} from "../../app/store";
import {setPatients, setPatient, clearPatient} from "./patientSlice";
import {getPatients, getPatientByUuid, updatePatient, createPatient} from "../../services/patient";
import type {CreatePatient, UpdatePatient} from "./types.ts";
import {isAxiosError} from "axios";
import {setToast} from "../snackbar/toastSlice.ts";
import {clearNotes} from "../note/noteSlice.ts";
import {clearReport} from "../report/reportSlice.ts";

// fetch patientsList
export const fetchPatients = () => async (dispatch: AppDispatch) => {
    try {
        const data = await getPatients();
        if (data) dispatch(setPatients(data));
    } catch (error) {
        if (isAxiosError(error)) {
            dispatch(setToast({open: true, variant: "error", message: error.message}))
        }
    }
};

// fetch patient
export const fetchPatientByUuid = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const patient = await getPatientByUuid(id);
        if (patient) {
            dispatch(setPatient(patient));
        }
    } catch (error) {
        if (isAxiosError(error)) {
            dispatch(setToast({open: true, variant: "error", message: error.message}))
        }
    }
};

// update patient
export const updatePatientDetails = (uuid: string, patientData: UpdatePatient) => async (dispatch: AppDispatch)=> {
    try {
        const patient = await updatePatient(uuid, patientData);
        if (patient) {
            dispatch(setPatient(patient))
        }

        return true
    } catch(error) {
        if (isAxiosError(error)) {
            dispatch(setToast({open: true, variant: "error", message: error.message}))
        }

        dispatch(setToast({open: true, variant: "error", message: "La mise à jour n'a pas pu aboutir"}))
        // pr interrompre l'exécution dans le composant et ne pas fermer le formulaire
        throw error;
    }
}

// add patient
export const addPatient = (patientData: CreatePatient) => async (dispatch: AppDispatch)=> {
    try {
        const patient = await createPatient(patientData);
        if (patient) {
            dispatch(setPatient(patient))
            dispatch(setToast({open: true, variant: "success", message:"Le patient a été enregistré."}))
        }

        return true
    } catch(error) {
        if (isAxiosError(error)) {
            dispatch(setToast({open: true, variant: "error", message: error.message}))
        }

        dispatch(setToast({open: true, variant: "error", message: "L'ajout du patient n'a pas pu aboutir"}))
        throw error;
    }
}

export const clearAllPatientData = () => (dispatch: AppDispatch) => {
    dispatch(clearPatient());
    dispatch(clearNotes());
    dispatch(clearReport());
};
