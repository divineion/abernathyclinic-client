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

export const getNotesByPatient = (uuid: string) => async (dispatch: AppDispatch) => {
    try {
        const data = await getNotesByPatientUuid(uuid);
        dispatch(setNotes(data))
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            dispatch(setToast({open: true, variant: "error", message: error.message}))
        }
    }
}

export const getNotesByDoctor = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const data = await getNotesByDoctorId(id)
        dispatch(setFilteredNotes(data))
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            dispatch(setToast({open: true, variant: "error", message: error.message}))
        }
    }
}

export const getNote = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const data = await getNoteById(id);
        if (data) {
            dispatch(setNote(data))
        }
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            dispatch(setToast({open: true, variant: "error", message: error.message}))
        }
    }
}

export const updateNote = (id: string, note: UpdateNote) => async (dispatch: AppDispatch) => {
    try {
         const response = await updateNoteById(id, note)
        if (!response?.success) {
            dispatch(setToast({open: true, message: "une erreur est survenue pendant la mise à jour", variant:"error"}))
        }

        dispatch(setToast({open: true, message: "La mise à jour a été effectuée", variant:"success"}))
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            dispatch(setToast({open: true, message: error.message, variant:"error"}))
        }
    }
}

export const addNote = (uuid: string, note: CreateNote) => async (dispatch: AppDispatch) => {
    try {
        const newNote = await createNote(uuid, note)
        if (newNote) {
            dispatch(setToast({open: true, message: "La note a bien été créée", variant:"success"}))
        }
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            dispatch(setToast({open: true, message: error.message, variant:"error"}))
        }
    }
}