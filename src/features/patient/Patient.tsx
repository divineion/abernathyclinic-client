import {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchPatientByUuid } from "./patientThunk";
import AddEditPatientForm from "./AddEditPatientForm.tsx";
import Button from "../../common/components/Button.tsx";
import Button from "../../common/components/Button.tsx"
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import DescriptionIcon from '@mui/icons-material/Description'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

const Patient = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const patient = useSelector((state: RootState) => state.patients.selectedPatient);
    const [onEdit, setOnEdit] = useState(false);

    const handleEditButtonClick = () => {
        setOnEdit(true)
    }

    const handleBackButtonClick = () => {
        setOnEdit(false);
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
            )}
            {onEdit && (
                <AddEditPatientForm
                    onEdit={onEdit}
                    setOnEdit={setOnEdit}
                    handleBackButtonClick={handleBackButtonClick}/>
            )}
        </>
    );
};

export default Patient;
