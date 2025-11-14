import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../app/store.ts";
import React, {useEffect, useState} from "react";
import type {Address, CreatePatient, UpdatePatient} from "./types.ts";
import {addPatient, clearAllPatientData, fetchPatients, updatePatientDetails} from "./patientThunk.ts";
import Button from "../../common/components/Button.tsx"
import SaveIcon from '@mui/icons-material/Save'
import {setToast} from "../snackbar/toastSlice.ts";

// TODO handle empty fields
const AddEditPatientForm = (
    {onEdit, setOnEdit, setShowForm}: AddEditPatientFormProps // on destructure les props
) => {
    const dispatch = useDispatch<AppDispatch>();

    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [gender, setGender] = useState("")
    const [birthDate, setBirthDate] = useState("")
    // nullable pour pouvoir envoyer des null au backend
    const [address, setAddress] = useState<Address | null>({streetNumber: "", street: "", zip: "", city: ""})
    const [phone, setPhone] = useState<string | null>("")

    const patient = useSelector((state: RootState) => state.patients?.selectedPatient)

    useEffect(() => {
        if (onEdit && patient) {
            setLastName(patient.lastName)
            setFirstName(patient.firstName)
            setGender(patient.gender)
            setBirthDate(patient.birthDate)
            setPhone(patient.phone || "")
            setAddress(patient.address || {streetNumber: "", street: "", zip: "", city: ""})
        }
    }, [onEdit, patient]);


    const isSamePatient = () => {
        return (
            lastName == patient?.lastName
            && firstName == patient?.firstName
            && gender == patient?.gender
            && phone == patient?.phone
            && address == patient?.address
        )
    }

    const handleLastNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value)
    }

    const handleFirstNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value)
    }

    const handleAddressChange = (field: keyof Address, value: string) => {
        // si address == null, créer champ vides, puis màj des champs
        setAddress({city: "", street: "", streetNumber: "", zip: "", ...address, [field]: value });
    }

    const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPhone(e.target.value)
    }

    const handleBirthDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setBirthDate(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (isSamePatient()) {
            dispatch(setToast({variant: "info", message: "Aucune modification à enregistrer", open: true}))
            return
        }

        if (onEdit && patient) {
            const patientData: UpdatePatient = { lastName, firstName, address, phone }
            await dispatch(updatePatientDetails(patient.uuid, patientData))
            setOnEdit(false);

            return
        }
        const addPatientData: CreatePatient = { lastName, firstName, birthDate, gender, address, phone }
        await dispatch(addPatient(addPatientData));
        dispatch(clearAllPatientData())
        dispatch(fetchPatients())
        if (setShowForm) {
            setShowForm(false)
        }
    }

    return (
        <>
            <form className={"section-limiter"} onSubmit={handleSubmit}>
                <div className={"patient-details grid-container"}>
                        <div className={"grid-item"}>
                            <label className={"label"} htmlFor={"patient-lastName"}>Nom </label>
                            <input className={"value"} id="patient-lastName" type="text" value={lastName}
                                   onChange={handleLastNameInputChange}/>
                        </div>

                        <div className={"grid-item"}><label htmlFor={"patient-firstName"}>Prénom </label>
                            <input id="patient-firstName" type="text" value={firstName} onChange={handleFirstNameInputChange}/>
                        </div>
                        <div className={"grid-item"}>
                            <label htmlFor={"patient-gender"}>Genre</label>
                            <input id="patient-gender" type="text" value={gender}
                                   onChange={(e) => setGender(e.target.value)}
                                   disabled={onEdit}/>
                        </div>
                        <div className={"grid-item"}>
                            <label htmlFor={"patient-birthDate"}>Date de naissance </label>
                            <input id="patient-birthDate" type="date" value={birthDate} onChange={handleBirthDateInputChange}
                                   disabled={onEdit}/>
                        </div>
                </div>

                <div className={"patient-contact grid-container"}>
                    <div className={"grid-item"}>
                        <label htmlFor={"patient-address-streetNumber"}>N°</label>
                        <input id={"patient-address-streetNumber"} type="text" value={address?.streetNumber}
                               onChange={(e) => handleAddressChange('streetNumber', e.target.value)}/>
                    </div>
                    <div className={"grid-item"}>
                        <label htmlFor={"patient-address-street"}>Rue</label>
                        <input id={"patient-address-street"} type="text" value={address?.street}
                               onChange={(e) => handleAddressChange('street', e.target.value)}/>
                    </div>
                    <div className={"grid-item"}><label htmlFor={"patient-address-zip"}>Code postal</label>
                        <input id={"patient-address-zip"} type="text" value={address?.zip}
                               onChange={(e) => handleAddressChange('zip', e.target.value)}/></div>
                    <div className={"grid-item"}>
                        <label htmlFor={"patient-address-city"}>Ville</label>
                        <input id={"patient-address-city"} type="text" value={address?.city}
                               onChange={(e) => handleAddressChange('city', e.target.value)}/>

                    </div>
                    <div className={"grid-item"}>
                        <label htmlFor={"patient-phone"}>Téléphone</label>
                        <input id={"patient-phone"} type="text" value={phone ?? ""} onChange={handlePhoneInputChange}/>
                    </div>
                </div>
                <Button
                    type={"submit"}
                    title={"Enregistrer"}
                    className="btn btn-secondary me-2"
                    ariaLabel={"Enregistrer le patient"}
                >
                    <SaveIcon/>
                </Button>
            </form>
        </>
    )
}

type AddEditPatientFormProps = {
    onEdit: boolean,
    setOnEdit: (value: boolean) => void,
    setShowForm?: (value: boolean) => void
}

export default AddEditPatientForm;