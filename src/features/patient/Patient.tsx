import {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchPatientByUuid } from "./patientThunk";
import AddEditPatientForm from "./AddEditPatientForm.tsx";

const Patient = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const patient = useSelector((state: RootState) => state.patients.selectedPatient);
    const [onEdit, setOnEdit] = useState(false);

    useEffect(() => {
        if (uuid) {
            dispatch(fetchPatientByUuid(uuid));
        }
    }, [dispatch, uuid]);

    if (!patient) return <p>Chargement</p>;

    return (
        <>
            {!onEdit && (
                <div className="container mt-4">
                    <h2>Fiche patient</h2>
                    <p><strong>Prénom:</strong> {patient.firstName}</p>
                    <p><strong>Nom:</strong> {patient.lastName}</p>
                    <p><strong>Date de naissance:</strong> {patient.birthDate}</p>
                    <p><strong>Genre:</strong> {patient.gender}</p>
                    {patient.phone && <p><strong>Téléphone:</strong> {patient.phone}</p>}
                    {patient.address && (
                        <p>
                            <strong>Adresse:</strong> {patient.address.streetNumber} {patient.address.street}, {patient.address.city}, {patient.address.zip}
                        </p>
                    )}

                    <div className="mt-3">
                        <button
                            className="btn btn-secondary me-2"
                            onClick={() => navigate("/patients")}
                        >
                            Retour à la liste
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={() => setOnEdit(true)}
                        >
                            Modifier le patient
                        </button>
                    </div>
                </div>
            )}
            {onEdit && (
                <AddEditPatientForm
                    onEdit={onEdit}
                    setOnEdit={setOnEdit}
                />
            )}
        </>
    );
};

export default Patient;
