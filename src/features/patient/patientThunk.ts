import type {AppDispatch} from "../../app/store";
import { setPatients, setPatient } from "./patientSlice";
import { getPatients, getPatientByUuid } from "../../services/patient";


// fetch patientsList
export const fetchPatients = () => async (dispatch: AppDispatch) => {
    try {
        const data = await getPatients();
        if (data) dispatch(setPatients(data));
    } catch (error) {
        console.error(error);
    }
};

// fetch patient
export const fetchPatientByUuid = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const patient = await getPatientByUuid(id);
        if (patient) dispatch(setPatient(patient));
    } catch (error) {
        console.error(error);
    }
};
