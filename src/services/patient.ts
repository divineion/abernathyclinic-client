import type {CreatePatient, MinimalPatient, Patient, UpdatePatient} from "../features/patient/types";
import api from "./axiosConfig.ts";
import {type AxiosResponse, isAxiosError} from "axios";

// COUCHE SERVICE
// Resppnsabilité = appels à l'API purs
export const getPatients = async (): Promise<MinimalPatient[]> => {
    try {
        const response = await api.get('http://localhost:8080/patients');
        return await response.data;
    } catch (error: unknown) {
        if (error instanceof Error) console.error(error.message);
        return [];
    }
};

export const getPatientByUuid = async (uuid: string): Promise<Patient | null> => {
    try {
        const response = await api(`http://localhost:8080/patient/${uuid}`);
        return await response.data;
    } catch (error: unknown) {
        if (error instanceof Error) console.error(error.message);
        return null;
    }
};

export  const updatePatient = async (uuid: string, patient: UpdatePatient): Promise<Patient | null> => {
    try {
        const response: AxiosResponse = await api.patch(
            `http://localhost:8080/patient/${uuid}/update`,
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
        const response: AxiosResponse = await api.post(
            "http://localhost:8080/patient",
            patient)

        return response.data;
    } catch (error : unknown) {
        if (isAxiosError(error)) {
            throw new Error(error.message)
        }

        throw new Error("Erreur inconnue lors de l'ajout")
    }
}