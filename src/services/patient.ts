import type {CreatePatient, MinimalPatient, Patient, UpdatePatient} from "../features/patient/types";
import axios, {type AxiosResponse, isAxiosError} from "axios";
import {axiosConfig} from "./axiosConfig.ts";

// COUCHE SERVICE
// Resppnsabilité = appels à l'API purs

export const getPatients = async (): Promise<MinimalPatient[]> => {
    try {
        const response = await fetch('http://localhost:8080/patients');
        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) console.error(error.message);
        return [];
    }
};

export const getPatientByUuid = async (uuid: string): Promise<Patient | null> => {
    try {
        const response = await fetch(`http://localhost:8080/patient/${uuid}`);
        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) console.error(error.message);
        return null;
    }
};

export  const updatePatient = async (uuid: string, patient: UpdatePatient): Promise<Patient | null> => {
    try {
        const response: AxiosResponse = await axios.patch(
            `http://localhost:8080/patient/${uuid}/update`,
            patient,
            axiosConfig()
        )

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
        const response: AxiosResponse = await axios.post(
            "http://localhost:8080/patient",
            patient,
            axiosConfig()
        )

        return response.data;
    } catch (error : unknown) {
        if (isAxiosError(error)) {
            throw new Error(error.message)
        }

        throw new Error("Erreur inconnue lors de l'ajout")
    }
}