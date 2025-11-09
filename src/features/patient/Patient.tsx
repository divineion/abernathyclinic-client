import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchPatientByUuid } from "./patientThunk";
import AddEditPatientForm from "./AddEditPatientForm.tsx";
import Notes from "../note/Notes.tsx";
import PatientInfo from "./PatientInfo.tsx";
import Button from "../../common/components/Button.tsx"
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import DescriptionIcon from '@mui/icons-material/Description'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

const Patient = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const [onEdit, setOnEdit] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [showPatientInfo, setShowPatientInfo] = useState(true);
    const patient = useSelector((state: RootState) => state.patients.selectedPatient);

    const navigate = useNavigate();

    const handleBackToListButtonClick = () => {
        navigate("/patients")
    }


    const handlePatientTabButtonClick = () => {
        if (!showPatientInfo) {
            setShowNotes(false)
            setShowPatientInfo(true)
            document.querySelector(".patient-tab-btn")?.classList.add("active-tab")
            document.querySelector(".notes-tab-btn")?.classList.remove("active-tab")
        }
    }

    const handleNotesTabButtonClick = () => {
        if (!showNotes) {
            setShowNotes(true)
            setShowPatientInfo(false)
            document.querySelector(".patient-tab-btn")?.classList.remove("active-tab")
            document.querySelector(".notes-tab-btn")?.classList.add("active-tab")
        }
    }

    useEffect(() => {
        if (uuid) {
            dispatch(fetchPatientByUuid(uuid));
        }
    }, [dispatch, uuid]);

    return (
        <div className={"section-limiter"}>
            <nav className={"patient-page-nav"}>
                <div className={"patient-page-nav"}>
                    <Button
                        type={"button"}
                        className={"btn patient-tab-btn active-tab"}
                        title={"Fiche patient"} ariaLabel={"fiche patient"} handleClick={handlePatientTabButtonClick}>
                        <PermContactCalendarIcon/>
                    </Button>
                    <Button
                        type={"button"}
                        className={"btn notes-tab-btn"}
                        title={"Notes"}
                        ariaLabel={"historique des notes"}
                        handleClick={handleNotesTabButtonClick}
                    >
                        <DescriptionIcon/>
                    </Button>
                </div>
                <div>
                    <Button
                        type={"button"}
                        className={"btn"}
                        title={"Retour à la liste de patients"}
                        ariaLabel={"retour à la liste de patients"}
                        handleClick={ handleBackToListButtonClick}>
                        <KeyboardBackspaceIcon/>
                    </Button>
                </div>
            </nav>
            {patient && !onEdit && showPatientInfo &&
                <PatientInfo setOnEdit={setOnEdit}/>
            }

            {onEdit && !showNotes &&(
                <AddEditPatientForm
                    onEdit={onEdit}
                    setOnEdit={setOnEdit}
                />
            )}

            {patient && showNotes &&
                <Notes uuid={patient.uuid}/>
            }
        </div>
    );
};

export default Patient;
