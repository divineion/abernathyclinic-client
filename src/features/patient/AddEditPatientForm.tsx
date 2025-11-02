import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../app/store.ts";
import React, {useEffect, useState} from "react";
import type {Address} from "./types.ts";
import {updatePatientDetails} from "./patientThunk.ts";

const AddEditPatientForm = (
    {onEdit, setOnEdit}: AddEditPatientFormProps // on destructure les props
) => {
    const dispatch = useDispatch<AppDispatch>();
    // initialement vides (onEdit = false)
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [gender, setGender] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [address, setAddress] = useState<Address>({streetNumber: "", street: "", zip: "", city: ""})
    const [phone, setPhone] = useState("")

    // on récup le patient depuis le store redux
    const patient = useSelector((state: RootState) => state.patients?.selectedPatient)

    // si mode édition, mise à jour du state local avec les données du patient
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

    const handleSubmitButtonClick = () => {
        setOnEdit(false);
        if (patient) {
            const updatedPatientData = {
                lastName,
                firstName,
                gender,
                address,
                phone
            };
            dispatch(updatePatientDetails(patient.uuid, updatedPatientData))
        }
    }

    const handleBackButtonClick = () => {
        setOnEdit(false);
    }

    const handleLastNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value)
    }

    const handleFirstNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value)
    }

    const handleStreetNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setAddress({streetNumber: e.target.value, street: address.street, zip: address.zip, city: address.city})
    }

    const handleZipInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setAddress({streetNumber: address.streetNumber, street: address.street, zip: e.target.value, city: address.city})
    }

    const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setAddress({streetNumber: address.streetNumber, street: address.street, zip: address.zip, city: e.target.value})
    }

    const handleStreetInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setAddress({streetNumber: address.streetNumber, street: e.target.value, zip: address.zip, city: address.city})
    }

    const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPhone(e.target.value)
    }

    return (
        <>
            <form>
                <fieldset>
                    <input id="patient-lastName" type="text" value={lastName} onChange={handleLastNameInputChange}/>
                    <input id="patient-firstName" type="text" value={firstName} onChange={handleFirstNameInputChange} />
                    <input id="patient-gender" type="text" value={gender} onChange={(e) => setGender(e.target.value)}/>
                    <input id="patient-birthDate" type="text" value={birthDate} disabled={true}/>
                </fieldset>

                <fieldset>
                    <input id={"patient-address-streetNumber"} type="text" value={address?.streetNumber} onChange={handleStreetNumberInputChange}/>
                    <input id={"patient-address-street"} type="text" value={address?.street} onChange={handleStreetInputChange}/>
                    <input id={"patient-address-zip"} type="text" value={address?.zip} onChange={handleZipInputChange}/>
                    <input id={"patient-address-city"} type="text" value={address?.city} onChange={handleCityInputChange}/>
                    <input id={"patient-phone"} type="text" value={phone} onChange={handlePhoneInputChange}/>
                </fieldset>
            </form>

            <button className="btn btn-secondary me-2" type="button" onClick={handleSubmitButtonClick}>Valider</button>
            <button className="btn btn-secondary me-2" type="button" onClick={handleBackButtonClick}>Retour</button>
        </>
    )
}

type AddEditPatientFormProps = {
    onEdit: boolean;
    setOnEdit: (value: boolean) => void;
}

export default AddEditPatientForm;