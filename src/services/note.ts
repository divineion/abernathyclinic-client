import api from "./axiosConfig.ts";
import {type AxiosResponse, isAxiosError} from "axios";
import {
    CREATE_NOTE_ROUTE,
    GET_NOTE_ROUTE, GET_NOTES_BY_DOCTOR_ROUTE,
    GET_NOTES_ROUTE,
    UPDATE_NOTE_ROUTE
} from "../utils/apiRoutes.ts";
import type {MinimalNote, Note, UpdateNote} from "../features/note/types.ts";
import type {UpdateResultDTO} from "../common/types.ts";

export const getNotesByPatientUuid = async (uuid: string): Promise<MinimalNote[]> =>  {
    try {
        const response = await api.get(GET_NOTES_ROUTE(uuid));
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) console.error(error.message);
        return [];
    }
};

export const getNotesByDoctorId = async (id: string): Promise<MinimalNote[]> =>  {
    try {
        const response = await api.get(GET_NOTES_BY_DOCTOR_ROUTE(id));
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) console.error(error.message);
        return [];
    }
};

export const getNoteById = async (id: string): Promise<Note | null> => {
    try {
        const response = await api(GET_NOTE_ROUTE(id));
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) console.error(error.message);
        return null;
    }
};

export  const updateNoteById = async (id: string, note: UpdateNote): Promise<UpdateResultDTO | null> => {
    try {
        const response: AxiosResponse = await api.patch(UPDATE_NOTE_ROUTE(id),
            note)

        return response.data;
    } catch (error : unknown) {
        if (isAxiosError(error)) {
            throw new Error(error.message)
        }
        throw new Error('Erreur inconnue lors de la mise à jour')
    }
}

export  const createNote = async (uuid: string, note: Note): Promise<Note | null> => {
    try {
        const response: AxiosResponse = await api.post(CREATE_NOTE_ROUTE(uuid), note)

        return response.data;
    } catch (error : unknown) {
        if (isAxiosError(error)) {
            throw new Error(error.message)
        }

        throw new Error("Erreur inconnue lors de l'ajout")
    }
}