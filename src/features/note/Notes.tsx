import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../app/store.ts";
import {getNote, getNotesByPatient} from "./noteThunk.ts";
import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import {DARK_THEME_BG} from '../../utils/styleVariables.ts'
import Button from "../../common/components/Button.tsx"
import Note from "./Note.tsx";
import AddEditNoteForm from "./AddEditNoteForm.tsx";
import VisibilityIcon from '@mui/icons-material/Visibility';

export const Notes= ({uuid}: NoteProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const notes = useSelector((state: RootState) => state.notes.notes)

    const [showNote, setShowNote] = useState(false);
    const [onEdit, setOnEdit] = useState(false);

    const handleShowNoteClick = (id: string) => {
        dispatch(getNote(id))
        setShowNote(true)
        setOnEdit(false)
    }

    const columns: GridColDef<typeof rows[number]>[] = [
        {field: "doctorId", headerName: "id médecin", width: 90},
        {field: "createdAt", headerName: "créée le", width: 150},
        {field: "updatedAt", headerName: "modifiée le", width: 90},
        {field: "showPatient", headerName: "voir la note", width: 150,
            renderCell: params => (
                <Button
                    type={"button"}
                    className={"btn"}
                    title={"voir la note du médecin"}
                    ariaLabel={"voir la note du médecin"}
                    handleClick={() => handleShowNoteClick(params.row.id)}
                >
                    <VisibilityIcon/>
                </Button>
            )

        }
    ]

    const rows = notes

    useEffect(() => {
        dispatch(getNotesByPatient(uuid))
    }, [dispatch, uuid])

    return (
        <>
            { !showNote && !onEdit &&
                <section className={"section-limiter"}>
                    <DataGrid columns={columns}
                      rows={rows}
                      getRowId={(row) => row.id}
                      initialState={{
                          columns: {
                              columnVisibilityModel: {
                                  // id: false,
                                  doctorId: false,
                                  patientUuid: false
                              }
                          },
                          pagination: {
                              paginationModel: {
                                  pageSize: 5,
                              },
                          }
                      }}
                      style={{
                          background: DARK_THEME_BG,
                          color: "grey",
                          cursor: "pointer"
                      }}
                      pageSizeOptions={[5]}
                      disableRowSelectionOnClick
                    ></DataGrid>
                </section>
            }

            {showNote &&
                <>
                <Note
                    showNote={showNote}
                    setShowNote={setShowNote}
                    onEdit={onEdit}
                    setOnEdit={setOnEdit}
                />
                </>
            }

            {onEdit &&
                <AddEditNoteForm onEdit={onEdit} setOnEdit={setOnEdit}/>

            }
        </>
    )
}

type NoteProps = {
    uuid: string
}

export default Notes;