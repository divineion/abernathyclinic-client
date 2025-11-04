// patients
export const GET_PATIENTS_ROUTE = "http://localhost:8080/patients";
export const GET_PATIENT_ROUTE = (uuid: string) => `http://localhost:8080/patient/${uuid}`;
export const UPDATE_PATIENT_ROUTE = (uuid: string) => `http://localhost:8080/patient/${uuid}/update`;
export const CREATE_PATIENT_ROUTE = "http://localhost:8080/patient";

// user
export const GET_USER_INFO_ROUTE = "/user";