import type {CreatePatient, MinimalPatient, Patient, UpdatePatient} from "../features/patient/types";
import api from "./axiosConfig.ts";
import {type AxiosResponse, isAxiosError} from "axios";
import {
    CREATE_PATIENT_ROUTE,
    GET_PATIENT_ROUTE,
    GET_PATIENTS_ROUTE,
    UPDATE_PATIENT_ROUTE
} from "../utils/apiRoutes.ts";

// COUCHE SERVICE
// Resppnsabilité = appels à l'API purs
export const getPatients = async (): Promise<MinimalPatient[]> => {
    try {
        const response = await api.get(GET_PATIENTS_ROUTE);
        return await response.data;
    } catch (error: unknown) {
        if (error instanceof Error) console.error(error.message);
        return [];
    }
};

export const getPatientByUuid = async (uuid: string): Promise<Patient | null> => {
    try {
        const response = await api(GET_PATIENT_ROUTE(uuid));
        return await response.data;
    } catch (error: unknown) {
        if (error instanceof Error) console.error(error.message);
        return null;
    }
};

export  const updatePatient = async (uuid: string, patient: UpdatePatient): Promise<Patient | null> => {
    try {
        const response: AxiosResponse = await api.patch(UPDATE_PATIENT_ROUTE(uuid),
            patient)

        return response.data;
    } catch (error : unknown) {
        if (isAxiosError(error)) {
            throw new Error(error.message)
        }

        throw new Error('Erreur inconnue lors de la mise à jour')
    }
}

export  const createPatient = async (patient: CreatePatient): Promise<Patient | null> => {
    try {
        const response: AxiosResponse = await api.post(CREATE_PATIENT_ROUTE, patient)

        return response.data;
    } catch (error : unknown) {
        if (isAxiosError(error)) {
            throw new Error(error.message)
        }

        throw new Error("Erreur inconnue lors de l'ajout")
    }
}