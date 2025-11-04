import {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchPatientByUuid } from "./patientThunk";
import AddEditPatientForm from "./AddEditPatientForm.tsx";
import Button from "../../common/components/Button.tsx";

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
        <>
            {patient && !onEdit && (
                <div className="container mt-4">
                    <h2>Fiche patient</h2>
                    <p><strong>Prénom:</strong> {patient.firstName}</p>
                    <p><strong>Nom:</strong> {patient.lastName}</p>
                    <p><strong>Date de naissance:</strong> {patient.birthDate}</p>
                    <p><strong>Genre:</strong> {patient.gender}</p>
                    {patient.phone && <p><strong>Téléphone:</strong> {patient.phone}</p>}
                    {patient.address && (
                        <p>
                            <strong>Adresse:</strong> {patient.address.streetNumber} {patient.address.street} {patient.address.zip} {patient.address.city}
                        </p>
                    )}

                    <div className="mt-3">
                        <Button className={"btn btn-primary"} ariaLabel={"éditer"} title={"éditer"} value={"Modifier"} handleClick={handleEditButtonClick}/>
                        <Button className={"btn btn-primary me-2"} handleClick={() => navigate("/patients")} ariaLabel={"retour à la liste"} value={"Retour"} title={"Retour"}/>
                    </div>
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
