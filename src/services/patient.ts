import type {MinimalPatient, Patient} from "../features/patient/types";


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

export const getPatientById = async (uuid: string): Promise<Patient | null> => {
    try {
        const response = await fetch(`http://localhost:8080/patient/${uuid}`);
        return await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) console.error(error.message);
        return null;
    }
};