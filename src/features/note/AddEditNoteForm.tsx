import type {AppDispatch, RootState} from "../../app/store.ts"
import {useDispatch, useSelector} from "react-redux"
import React, {useEffect, useState} from "react"
import Button from '../../common/components/Button.tsx'
import {addNote, getNotesByPatient, updateNote} from "./noteThunk.ts"
import SaveIcon from '@mui/icons-material/Save'
import {setToast} from "../snackbar/toastSlice.ts";

const AddEditNoteForm = ({onEdit, setOnEdit, onSuccess}: AddEditNoteFormProps)=>  {
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) => state.user)
    const note = useSelector((state: RootState) => state.notes?.selectedNote)
    const patient = useSelector((state: RootState) => state.patients.selectedPatient)

    const [content, setContent] = useState("")
    const [originalContent, setOriginalContent] = useState("")

    const isSameContent = content === originalContent

    const handleContentInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }

    const handleEditNote = async () => {
        //EDIT MODE
        if (!note) {
            dispatch(setToast({open: true,
                variant: "error",
                message: "Erreur de chargement de la note"}))

            return
        }

        if (isSameContent) {
            dispatch(setToast({open: true,
                variant: "warning",
                message: "Aucune modification n'a été appliquée"}))

            return
        }
        await dispatch(updateNote(note.id, {doctorId: note.doctorId, content: content}))
        dispatch(getNotesByPatient(note.patientUuid))

        setOnEdit(false)
    }

    const handleAddNote = async () => {
        // ADD MODE
        // le patient est bien sélectionné et la note a un contenu
        if (patient && content.trim().length > 0) {
            await dispatch(addNote(patient.uuid, {
                patientUuid: patient.uuid,
                doctorId: user.id,
                createdAt: new Date().toLocaleString(),
                content: content
            }))

            dispatch(getNotesByPatient(patient.uuid))
            onSuccess()
        } else {
            dispatch(setToast({
                open: true,
                variant: "error",
                message: "Impossible d'ajouter une note vide ou sans patient."
            }));
        }

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (onEdit) {
            await handleEditNote()
        } else {
            await handleAddNote()
        }
    }

    useEffect(() => {
        if (onEdit && note) {
            setContent(note.content)
            setOriginalContent(note.content)
        } else {
            // ADD MODE ou quitter ONEDIT MODE
            setContent("")
            setOriginalContent("")
        }
    }, [note, onEdit]);

    return (
        <>
            <form className={"section-limiter"} onSubmit={handleSubmit}>
                <div className={"note-details"}>
                    {note && onEdit &&
                        <div className={"grid-item"}>
                            <div className={"label"}>Date</div>
                            <div className={"value"}>{new Date(note.createdAt).toLocaleDateString()}</div>
                        </div>
                    }
                    <div className={"grid-item"}>
                        <label htmlFor={"note-content"}>Note du médecin</label>
                        <textarea
                            id={"note-content"}
                            value={content}
                            onChange={(e) => handleContentInputChange(e)}>
                        </textarea>
                    </div>
                </div>
                <Button
                    type={"submit"}
                    title={"enregistrer"}
                    className={"btn"}
                    ariaLabel={"enregistrer les modifications"}
                >
                    <SaveIcon/>
                </Button>
            </form>
        </>
    );
}

type AddEditNoteFormProps = {
    onEdit: boolean,
    setOnEdit: (value: boolean) => void,
    onSuccess: () => void
}

export default AddEditNoteForm