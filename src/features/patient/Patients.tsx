import { useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import type {AppDispatch, RootState} from "../../app/store";
import type {MinimalPatient} from "./types";
import { fetchPatients} from "./patientThunk";
import { useNavigate } from "react-router-dom";
import AddEditPatientForm from "./AddEditPatientForm.tsx";
import Navbar from "../../common/components/Navbar.tsx";
import Button from "../../common/components/Button.tsx";

const Patients = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const patients = useSelector((state: RootState) => state.patients.patients);

    const [onEdit, setOnEdit] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect( () => {
       // appeler getPatients() via  fetchPatients() et dispatcher la promesse
        dispatch(fetchPatients());
    }, [dispatch])

    const handleShowPatientClick = (uuid: string) => {
        navigate(`/patient/${uuid}`);
    };

    const handleAddPatientClick = () => {
        setOnEdit(false)
        setShowForm(true);
    }

    const handleBackButtonClick = () => {
        setShowForm(false)
        // recharger la liste juste après fermeture du form
        dispatch(fetchPatients())
    }

    return (
        <>
            <Navbar></Navbar>

            {!showForm &&
                <div className="container mt-4">
                    <h2>Liste des patients</h2>
                    <div>
                        <Button
                            className={"btn add-patient-button"}
                            title={"Ajouter un patient"}
                            handleClick={handleAddPatientClick}
                            ariaLabel={"ajouter un patient"}
                            value={"+"}
                        />
                    </div>
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
                        {patients.map((patient: MinimalPatient) => (
                            <tr key={patient.uuid}>
                                <td>{patient.firstName}</td>
                                <td>{patient.lastName}</td>
                                <td>{patient.birthDate}</td>
                                <td>{patient.gender}</td>
                                <td>
                                    <button
                                        className="btn btn-sm"
                                        onClick={() => handleShowPatientClick(patient.uuid)}
                                    >
                                        Voir
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            }
            {showForm &&
                <AddEditPatientForm onEdit={onEdit} setOnEdit={setOnEdit} handleBackButtonClick={handleBackButtonClick}/>
            }
        </>
    );
};

export default Patients;
