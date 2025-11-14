import {useEffect, useRef, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import type {AppDispatch, RootState} from "../../app/store";
import type {MinimalPatient} from "./types";
import { fetchPatients} from "./patientThunk";
import { useNavigate } from "react-router-dom";
import AddEditPatientForm from "./AddEditPatientForm.tsx";import Button from "../../common/components/Button.tsx";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import VisibilityIcon from '@mui/icons-material/Visibility'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import {getNotesByDoctor} from "../note/noteThunk.ts";
import {setFilter} from "../note/noteSlice.ts";

const Patients = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.user)
    const patients = useSelector((state: RootState) => state.patients.patients)
    const filter = useSelector((state: RootState) => state.notes.filter)
    const filteredNotes = useSelector((state:RootState) => state.notes.filteredNotes)

    const filterBox = useRef<HTMLInputElement>(null)

    const [filteredPatients, setFilteredPatients] = useState<string[]>([])

    const [onEdit, setOnEdit] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const handleToggleFilterBoxClick = async () => {
        const newFilterState = !filter;
        dispatch(setFilter(newFilterState))

        if (newFilterState) {
            if (filteredNotes.length == 0) {
                // récupérer les notes du médecin
                await dispatch(getNotesByDoctor(user.id))
                // récupérer dans un tableau les patientUUID qui apparaissent dans les notes
                const patientsByDoctorId: string[] = [];
                filteredNotes.map((item) => patientsByDoctorId.push(item.patientUuid))

                setFilter(true)
            }
        }
    }

    useEffect(() => {
        if (filter && filteredNotes.length > 0) {
            const patientsByDoctorId = filteredNotes.map(n => n.patientUuid);
            setFilteredPatients(patientsByDoctorId);
        }
    }, [filteredNotes, filter]);

    const handleShowPatientClick = (uuid: string) => {
        navigate(`/patient/${uuid}`);
    };

    const handleAddPatientClick = () => {
        setOnEdit(false)
        setShowForm(true);
    }

    const handleBackButtonClick = () => {
        setShowForm(false)
        setOnEdit(false)
        // recharger la liste juste après fermeture du form
        dispatch(fetchPatients())
    }

    useEffect( () => {
        if (patients.length == 0) {
            dispatch(fetchPatients());
        }
    }, [dispatch, patients])

    return (
        <div className={"section-limiter"}>
            <div className={"d-flex justify-content-end"}>
                <Button
                    type={"button"}
                    className={"btn add-patient-button"}
                    title={showForm ? "Retour à la liste" : "Enregistrer un nouveau patient"}
                    handleClick={showForm ? handleBackButtonClick : handleAddPatientClick}
                    ariaLabel={showForm ? "Retour à la liste" : "Enregistrer un nouveau patient"}
                >
                    { showForm
                        ? <KeyboardBackspaceIcon/>
                        : <PersonAddAltIcon/>
                    }
                </Button>
            </div>
            {!showForm &&
                <>
                    { filter
                        ? <h2>Patients suivis</h2>
                        : <h2>Tous les patients</h2>
                    }

                    { user.role == "ROLE_DOCTOR" &&
                        <>
                            <label htmlFor={"patients-list-filter-toggle-box"}>N'afficher que les patients suivis &nbsp;</label>
                            <input
                                type={"checkbox"}
                                id={"patients-list-filter-toggle-box"}
                                checked={filter}
                                onChange={handleToggleFilterBoxClick}
                                ref={filterBox}
                            />
                        </>
                    }
                    <div className="section-limiter patients-list-table-container">
                        <table className="table table-striped table-dark mt-3">
                            <thead>
                            <tr>
                                <th>Prénom</th>
                                <th>Nom</th>
                                <th>Date de naissance</th>
                                <th>Genre</th>
                                <th>Détails</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                patients
                                    // garder le patient soit si le filtrage est désactivé,
                                    // soit si son uuid est dans la liste des patients filtrés à partir des notes
                                    .filter((p) => !filter || filteredPatients.includes(p.uuid))
                                    .map((patient: MinimalPatient) => (
                                    <tr key={patient.uuid}>
                                        <td>{patient.firstName}</td>
                                        <td>{patient.lastName}</td>
                                        <td>{new Date(patient.birthDate).toLocaleDateString()}</td>
                                        <td>{patient.gender}</td>
                                        <td>
                                            <Button
                                                type={"button"}
                                                className="btn btn-sm"
                                                handleClick={() => handleShowPatientClick(patient.uuid)}
                                                ariaLabel={"voir le patient"}
                                                title={`voir le patient ${patient.lastName}`}
                                            >
                                                <VisibilityIcon/>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </>
            }
            {showForm &&
                <AddEditPatientForm onEdit={onEdit} setOnEdit={setOnEdit} setShowForm={setShowForm}/>
            }
        </div>
    );
};

export default Patients;
