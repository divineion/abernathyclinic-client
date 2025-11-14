import type {AppDispatch} from "../../app/store";
import {setPatients, setPatient, clearPatient} from "./patientSlice";
import {getPatients, getPatientByUuid, updatePatient, createPatient} from "../../services/patient";
import type {CreatePatient, UpdatePatient} from "./types.ts";
import {isAxiosError} from "axios";
import {setToast} from "../snackbar/toastSlice.ts";
import {clearNotes} from "../note/noteSlice.ts";
import {clearReport} from "../report/reportSlice.ts";

const getPatientErrorMessage = (error: unknown, userAction: "fetch" | "add" | "update") => {
    if (isAxiosError(error)) {
        switch (error.response?.status) {
            case 400: return "Requête invalide";
            case 401: return "Vous n'êtes pas autorisé";
            case 404: return "Patient non trouvé";
            case 500: return "Erreur serveur, veuillez réessayer plus tard";
            default: return `Erreur inattendue (${error.response?.status})`;
        }
    }
    return userAction === "add"
        ? "L'ajout du patient n'a pas pu aboutir"
        : userAction === "update"
            ? "La mise à jour du patient n'a pas pu aboutir"
            : "Une erreur est survenue";
};


// fetch patientsList
export const fetchPatients = () => async (dispatch: AppDispatch) => {
    try {
        const data = await getPatients();
        if (data) dispatch(setPatients(data));
    } catch (error) {
        dispatch(setToast({
            open: true,
            variant: "error",
            message: getPatientErrorMessage(error, "fetch")
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
            message: getPatientErrorMessage(error, "fetch")
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
            message: getPatientErrorMessage(error, "update")
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
            message: getPatientErrorMessage(error, "add")
        }))

        throw error;
    }
}

export const clearAllPatientData = () => (dispatch: AppDispatch) => {
    dispatch(clearPatient());
    dispatch(clearNotes());
    dispatch(clearReport());
};
