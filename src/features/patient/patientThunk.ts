import type {AppDispatch} from "../../app/store";
import { setPatients, setPatient } from "./patientSlice";
import {getPatients, getPatientByUuid, updatePatient, createPatient} from "../../services/patient";
import type {CreatePatient, UpdatePatient} from "./types.ts";


// fetch patientsList
export const fetchPatients = () => async (dispatch: AppDispatch) => {
    try {
        const data = await getPatients();
        if (data) dispatch(setPatients(data));
    } catch (error) {
        console.error(error);
    }
};

// fetch patient
export const fetchPatientByUuid = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const patient = await getPatientByUuid(id);
        if (patient) dispatch(setPatient(patient));
    } catch (error) {
        console.error(error);
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
        console.error(error)
    }
}

// add patient
export const addPatient = (patientData: CreatePatient) => async (dispatch: AppDispatch)=> {
    try {
        const patient = await createPatient(patientData);
        if (patient) {
            dispatch(setPatient(patient))
        }
    } catch(error) {
        console.error(error)
    }
}
