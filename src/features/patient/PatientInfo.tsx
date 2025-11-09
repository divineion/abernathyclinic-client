import Button from "../../common/components/Button.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../app/store.ts";
import EditIcon from '@mui/icons-material/Edit';

const PatientInfo = (
    { setOnEdit} : PatientInfoProps) => {
    const patient = useSelector((state: RootState) => state.patients.selectedPatient);
    const user = useSelector((state: RootState) => state.user);
    const handleEditButtonClick = () => {
        if (user.role === "ROLE_ORGANIZER")  setOnEdit(true)
    }

    return (
        <>
            { patient &&
                <section className="section-limiter">
                    <h2>Information patient</h2>
                    <div className={"patient-details grid-container"}>
                        <div className={"grid-item"}>
                                <div className={"label"}> Nom</div>
                                <span className={"value"}>{patient.lastName}</span>
                        </div>
                        <div className={"grid-item"}>
                            <div className={"label"}>Prénom</div>
                            <span className={"value"}>{patient.firstName}</span>
                        </div>

                        <div className={"grid-item"}>
                            <div className={"label"}>Date de naissance</div>
                            <span className={"value"}>{new Date(patient.birthDate).toLocaleDateString()}</span>
                        </div>
                        <div className={"grid-item"}>
                            <div className={"label"}>Genre</div>
                            <span className={"value"}>{patient.gender}</span>
                            <div className={"label"}>Âge</div>
                            <div className={"value"}>{new Date().getFullYear() - new Date(patient.birthDate).getFullYear()}</div>
                        </div>
                    </div>
                    <div className={"patient-contact grid-container"}>
                        <div className={"grid-item"}>
                        { patient.phone
                            ? <>
                                <div className={"label"}>Téléphone </div>
                                <span className={"value"}>{patient.phone}</span>
                            </>
                            : <>
                                <div className={"label"}>Téléphone </div>
                            </> }
                        </div>
                        <div className={"grid-item"}>
                            { patient.address
                                ? <>
                                    <div className={"label"}>Adresse </div>
                                    <span className={"value"}>
                                        {patient.address.streetNumber} {patient.address.street} {patient.address.zip} {patient.address.city}
                                    </span>
                                </>
                                : <>
                                    <div className={"label"}>Adresse</div>
                                </> }
                        </div>
                    </div>

                    <div className="mt-3">
                        <Button
                            type={"button"}
                            className={"btn"}
                            ariaLabel={"éditer"} title={"éditer le patient"}
                            handleClick={handleEditButtonClick}
                        >
                            <EditIcon/>
                        </Button>
                    </div>
                </section>
            }
        </>
    )
}

type PatientInfoProps = {
    setOnEdit: (value: boolean) => void
}

export default PatientInfo