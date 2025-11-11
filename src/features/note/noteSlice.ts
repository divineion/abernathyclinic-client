import {createSlice, type PayloadAction} from "@reduxjs/toolkit"
import type {MinimalNote, Note} from "./types.ts";

interface NoteState {
    selectedNote: Note | null,
    notes: MinimalNote[],
    filter: boolean,
    filteredNotes: MinimalNote[],
}

 const initialState: NoteState = {
    selectedNote: null,
    notes: [],
    filter: false,
    filteredNotes: [],
}

export const noteSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setNote: (state, action: PayloadAction<Note>) => {
          state.selectedNote = action.payload
        },
        setNotes: (state, action: PayloadAction<MinimalNote[]>)=> {
            state.notes = action.payload
        },
        setFilter: (state, action: PayloadAction<boolean>) => {
            state.filter = action.payload
        },
        setFilteredNotes: (state, action: PayloadAction<MinimalNote[]>) => {
            state.filteredNotes = action.payload
        },
        clearNotes: (state) => {
            state.notes = []
            state.selectedNote = null
        }
    }
})

export const { setNote, setNotes, setFilter, setFilteredNotes, clearNotes } = noteSlice.actions

export default noteSlice.reducer