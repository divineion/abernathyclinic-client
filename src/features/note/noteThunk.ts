import {
    createNote,
    getNoteById,
    getNotesByDoctorId,
    getNotesByPatientUuid,
    updateNoteById
} from "../../services/note.ts";
import type {AppDispatch} from "../../app/store.ts";
import {setFilteredNotes, setNote, setNotes} from "./noteSlice.ts";
import type {CreateNote, UpdateNote} from "./types.ts";
import {setToast} from "../snackbar/toastSlice.ts";
import {isAxiosError} from "axios";

const getNoteErrorMessage = (error: unknown, userAction: "fetch" | "add" | "update") => {
    if (isAxiosError(error)) {
        switch (error.response?.status) {
            case 400:
                return "Requête invalide";
            case 401:
                return "Vous n'êtes pas autorisé";
            case 404:
                return "Note non trouvée";
            case 500:
                return "Erreur serveur, veuillez réessayer plus tard";
            default:
                return `Erreur inattendue (${error.response?.status})`;
        }
    }
    return userAction === "add"
        ? "L'ajout de la note n'a pas pu aboutir"
        : userAction === "update"
            ? "La mise à jour de la note n'a pas pu aboutir"
            : "Une erreur est survenue"
}

export const getNotesByPatient = (uuid: string) => async (dispatch: AppDispatch) => {
    try {
        const data = await getNotesByPatientUuid(uuid);
        dispatch(setNotes(data))
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            dispatch(setToast({open: true, variant: "error", message: getNoteErrorMessage(error, "fetch")}))
        }
    }
}

export const getNotesByDoctor = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const data = await getNotesByDoctorId(id)
        dispatch(setFilteredNotes(data))
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            dispatch(setToast({open: true, variant: "error", message: getNoteErrorMessage(error,"fetch")}))
        }
    }
}

export const getNote = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const data = await getNoteById(id);
        if (data) {
            dispatch(setNote(data))
        }
    } catch (error) {
        dispatch(setToast({
            open: true, variant: "error", message : getNoteErrorMessage(error, "fetch")
        }))
    }
}

export const updateNote = (id: string, note: UpdateNote) => async (dispatch: AppDispatch) => {
    try {
        await updateNoteById(id, note)

        dispatch(setToast({open: true, message: "La mise à jour a été effectuée", variant:"success"}))
    } catch (error) {
        dispatch(setToast({
            open: true, variant: "error", message : getNoteErrorMessage(error, "update")
        }))
    }
}

export const addNote = (uuid: string, note: CreateNote) => async (dispatch: AppDispatch) => {
    try {
        const newNote = await createNote(uuid, note)
        if (newNote) {
            dispatch(setToast({open: true, message: "La note a été enregistrée", variant:"success"}))
        }
    } catch (error) {
        dispatch(setToast({
            open: true, variant: "error", message: getNoteErrorMessage(error, "add")
        }))
    }
}