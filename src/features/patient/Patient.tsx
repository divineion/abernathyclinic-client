import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import {clearAllPatientData, fetchPatientByUuid} from "./patientThunk";
import AddEditPatientForm from "./AddEditPatientForm.tsx";
import Notes from "../note/Notes.tsx";
import PatientInfo from "./PatientInfo.tsx";
import Button from "../../common/components/Button.tsx"
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import DescriptionIcon from '@mui/icons-material/Description'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import AssessmentIcon from '@mui/icons-material/Assessment';
import Report from "../report/Report.tsx";

const Patient = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const [onEdit, setOnEdit] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [showPatientInfo, setShowPatientInfo] = useState(true);
    const [showReport, setShowReport] = useState(false);
    const patient = useSelector((state: RootState) => state.patients.selectedPatient);

    const navigate = useNavigate();

    const handleBackToListButtonClick = () => {
        dispatch(clearAllPatientData())
        navigate("/patients")
    }

    const handlePatientTabButtonClick = () => {
        if (!showPatientInfo) {
            setShowNotes(false)
            setShowPatientInfo(true)
            setShowReport(false)
            document.querySelector(".patient-tab-btn")?.classList.add("active-tab")
            document.querySelector(".notes-tab-btn")?.classList.remove("active-tab")
            document.querySelector(".report-tab-btn")?.classList.remove("active-tab")
        }
    }

    const handleNotesTabButtonClick = () => {
        if (!showNotes) {
            setShowNotes(true)
            setShowPatientInfo(false)
            setShowReport(false)
            document.querySelector(".report-tab-btn")?.classList.remove("active-tab")
            document.querySelector(".patient-tab-btn")?.classList.remove("active-tab")
            document.querySelector(".notes-tab-btn")?.classList.add("active-tab")
        }
    }

    const handleReportTabButtonClick = () => {
        if (!showReport) {
            setShowReport(true)
            setShowNotes(false)
            setShowPatientInfo(false)
            document.querySelector(".patient-tab-btn")?.classList.remove("active-tab")
            document.querySelector(".notes-tab-btn")?.classList.remove("active-tab")
            document.querySelector(".report-tab-btn")?.classList.add("active-tab")
        }
    }

    // rpoblème de mise à jour intempestive du state patient à caused e la condition
    // ok... lors du chargement de la page patient, j'ai bien un uuid dans le state local et
    // un patient null puisque je l'ai clear
    // donc : fetche le patient s'il n'y a pas de patient OU si l'uuid du patient n'est pas la même que sur la page
    useEffect(() => {
        if (uuid && (!patient || patient.uuid !== uuid)) {
            dispatch(fetchPatientByUuid(uuid));
        }
    }, [dispatch, uuid, patient]);

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
                    <Button
                        type={"button"}
                        className={"btn report-tab-btn"}
                        title={"Rapport de risque de diabète"}
                        ariaLabel={"rapport de risque de diabète"}
                        handleClick={handleReportTabButtonClick}
                    >
                        <AssessmentIcon/>
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
{/*ATTENTION UPDATE PATIENT COMPONENT AFTER UPDATING NOTES TO COMPUTE REPORT*/}
            {onEdit && !showNotes &&(
                <AddEditPatientForm
                    onEdit={onEdit}
                    setOnEdit={setOnEdit}
                />
            )}

            {patient && showNotes &&
                <Notes uuid={patient.uuid}/>
            }

            { patient && showReport &&
                <Report patientUuid={patient.uuid}/>
            }
        </div>
    );
};

export default Patient;
