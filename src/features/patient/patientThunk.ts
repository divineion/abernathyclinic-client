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
        dispatch(setToast({
            open: true,
            variant: "error",
            message: isAxiosError(error) ? error.message : "Une erreur est survenue"
        }))
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
        dispatch(setToast({
            open: true,
            variant: "error",
            message: isAxiosError(error) ? error.message : "Une erreur est survenue"
        }))
    }
};

// update patient
export const updatePatientDetails = (uuid: string, patientData: UpdatePatient) => async (dispatch: AppDispatch)=> {
    try {
        const patient = await updatePatient(uuid, patientData);
        if (patient) {
            dispatch(setPatient(patient))
        }
    } catch(error) {
        dispatch(setToast({
            open: true,
            variant: "error",
            message: isAxiosError(error) ? error.message : "La mise à jour n'a pas pu aboutir"
        }))

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
    } catch(error) {
        dispatch(setToast({
            open: true,
            variant: "error",
            message: isAxiosError(error) ? error.message : "L'ajout du patient n'a pas pu aboutir"
        }))

        throw error;
    }
}

export const clearAllPatientData = () => (dispatch: AppDispatch) => {
    dispatch(clearPatient());
    dispatch(clearNotes());
    dispatch(clearReport());
};
