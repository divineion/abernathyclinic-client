import type {AppDispatch, RootState} from "../../app/store.ts";
import Button from "../../common/components/Button.tsx";
import {getNote} from "./noteThunk.ts";
import { useSelector, useDispatch} from "react-redux";
import AddEditNoteForm from "./AddEditNoteForm.tsx";
import EditIcon from '@mui/icons-material/Edit';
import {setToast} from "../snackbar/toastSlice.ts";

const Note = ({showNote, setShowNote, onEdit, setOnEdit} : NoteProps) => {
    const user = useSelector((state: RootState) => state.user)
    const note = useSelector((state: RootState) => state.notes?.selectedNote)
    const isUserAuthor = user.id == note?.doctorId

    const doctorId = note?.doctorId
    const content = note?.content

    const dispatch = useDispatch<AppDispatch>()

    const handleEditNoteClick = (id: string) => {
        if (isUserAuthor) {
            dispatch(getNote(id))
            setShowNote(false)
            setOnEdit(true)
        } else {
            dispatch(setToast({variant: "warning", message: "Vous n'avez pas la permission de modifier cette note.", open: true}))
        }
    }

    const closeForm = () => {
        setOnEdit(false)
        setShowNote(true)
    }

    return (
        <>
            { note && showNote &&
                <>
                    <div className={"section-limiter"}>
                        Note du {new Date(note.createdAt).toLocaleString()} <br/>
                        {note.updatedAt && <span>Dernière mise à jour le {new Date(note.updatedAt).toLocaleString()}</span>}
                            <div className={"note-content"}>
                                {content}
                            </div>
                            <div>Médecin : {doctorId}</div>
                        <Button
                            type={"button"}
                            className={"btn"}
                            title={"éditer la note"}
                            ariaLabel={"éditer la note"}
                            handleClick={() => handleEditNoteClick(note.id)}
                        >
                            <EditIcon/>
                        </Button>
                        </div>
                </>
            }

            { onEdit &&
                <AddEditNoteForm onEdit={onEdit} setOnEdit={setOnEdit} onSuccess={closeForm}/>
            }
        </>
    )
}

type NoteProps = {
    showNote: boolean,
    setShowNote: (value: boolean) => void,
    onEdit: boolean,
    setOnEdit: (value: boolean) => void
}

export default Note;