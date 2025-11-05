import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../app/store.ts";
import React, {useEffect, useState} from "react";
import type {Address, CreatePatient, UpdatePatient} from "./types.ts";
import {addPatient, updatePatientDetails} from "./patientThunk.ts";
import Button from "../../common/components/Button.tsx";

const AddEditPatientForm = (
    {onEdit, setOnEdit, handleBackButtonClick}: AddEditPatientFormProps // on destructure les props
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

    const handleSubmitButtonClick = async () => {
        if (onEdit && patient) {
            const patientData: UpdatePatient = { lastName, firstName, gender, address, phone }
            await dispatch(updatePatientDetails(patient.uuid, patientData))
            setOnEdit(false);

            return
        }
        const addPatientData: CreatePatient = { lastName, firstName, birthDate, gender, address, phone }
        await dispatch(addPatient(addPatientData))
        handleBackButtonClick()
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

    return (
        <>
            <form className={"container"}>
                <fieldset>
                    <label htmlFor={"patient-lastName"}>Nom </label>
                    <input id="patient-lastName" type="text" value={lastName} onChange={handleLastNameInputChange}/>

                    <label htmlFor={"patient-firstName"}>Prénom </label>
                    <input id="patient-firstName" type="text" value={firstName} onChange={handleFirstNameInputChange}/>

                    <label htmlFor={"patient-gender"}>Genre</label>
                    <input id="patient-gender" type="text" value={gender}
                               onChange={(e) => setGender(e.target.value)}/>
                    <label htmlFor={"patient-birthDate"}>Date de naissance </label>
                    <input id="patient-birthDate" type="date" value={birthDate} onChange={handleBirthDateInputChange}
                           disabled={onEdit}/>
                </fieldset>

                <fieldset>
                    <label htmlFor={"patient-address-streetNumber"}>N°</label>
                    <input id={"patient-address-streetNumber"} type="text" value={address?.streetNumber}
                           onChange={(e) => handleAddressChange('streetNumber', e.target.value)}/>

                    <label htmlFor={"patient-address-street"}>Rue</label>
                    <input id={"patient-address-street"} type="text" value={address?.street}
                           onChange={(e) => handleAddressChange('street', e.target.value)}/>

                    <label htmlFor={"patient-address-zip"}>Code postal</label>
                    <input id={"patient-address-zip"} type="text" value={address?.zip}
                           onChange={(e) => handleAddressChange('zip', e.target.value)}/>

                    <label htmlFor={"patient-address-city"}>Ville</label>
                    <input id={"patient-address-city"} type="text" value={address?.city}
                           onChange={(e) => handleAddressChange('city', e.target.value)}/>

                    <label htmlFor={"patient-phone"}>Téléphone</label>
                    <input id={"patient-phone"} type="text" value={phone ?? ""} onChange={handlePhoneInputChange}/>
                </fieldset>
            </form>

            <Button value={"enregistrer"}  title={"Ajouter"} className="btn btn-secondary me-2" ariaLabel={"Enregistrer"} handleClick={handleSubmitButtonClick}/>
            <Button className="btn me-2" ariaLabel={"retour"} handleClick={handleBackButtonClick} value={"Retour"}
                    title={"Retour"}/>
        </>
    )
}

type AddEditPatientFormProps = {
    onEdit: boolean;
    setOnEdit: (value: boolean) => void;
    handleBackButtonClick: () => void;
}

export default AddEditPatientForm;