import type {AppDispatch, RootState} from "../../app/store.ts"
import {useDispatch, useSelector} from "react-redux"
import React, {useEffect, useState} from "react"
import Button from '../../common/components/Button.tsx'
import {getNotesByPatient, updateNote} from "./noteThunk.ts"
import SaveIcon from '@mui/icons-material/Save'
import {setToast} from "../snackbar/toastSlice.ts";

const AddEditNoteForm = ({onEdit, setOnEdit}: AddEditNoteFormProps)=>  {
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) => state.user)
    const note = useSelector((state: RootState) => state.notes?.selectedNote)

    const [content, setContent] = useState("")
    const [originalContent, setOriginalContent] = useState("")

    const isSameContent = content === originalContent

    const handleContentInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (note) {
            if (!isSameContent) {
                await dispatch(updateNote(note.id, {content}))
                dispatch(getNotesByPatient(note.patientUuid))
            } else {
                dispatch(setToast({open: true,
                    variant: "warning",
                    message: "Aucune modification n'a été appliquée"}))
            }
        }
        setOnEdit(false)
    }

    useEffect(() => {
        if (onEdit && note) {
            setContent(note.content)
            setOriginalContent(note.content)
        }
    }, [note, onEdit]);

    return (
        <>
            <form className={"section-limiter"} onSubmit={handleSubmit}>
                <div className={"note-details"}>
                    <input id={"note-form__user-id"}
                           type={"hidden"}
                           value={user.id}
                    />
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
    setOnEdit: (value: boolean) => void
}

export default AddEditNoteForm