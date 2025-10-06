import {useEffect} from "react";
import { useSelector, useDispatch} from "react-redux";
import type {AppDispatch, RootState} from "../../app/store";
import type {MinimalPatient} from "./types";
import { fetchPatients} from "./patientThunk";
import { useNavigate } from "react-router-dom";

const Patients = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    const patients = useSelector((state: RootState) => state.patients.patients);

    useEffect( () => {
       // appeler getPatients() via  fetchPatients() et dispatcher la promesse
        dispatch(fetchPatients());
    }, [dispatch])

    const handleClick = (uuid: string) => {
        navigate(`/patient/${uuid}`);
    };

    return (
        <div className="container mt-4">
            <h2>Liste des patients</h2>

            <table className="table table-striped mt-3">
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
                                className="btn btn-primary btn-sm"
                                onClick={() => handleClick(patient.uuid)}
                            >
                                Voir
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Patients;
