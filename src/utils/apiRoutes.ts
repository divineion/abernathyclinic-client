// patients
export const GET_PATIENTS_ROUTE = "http://localhost:8080/patients";
export const GET_PATIENT_ROUTE = (uuid: string) => `http://localhost:8080/patient/${uuid}`;
export const UPDATE_PATIENT_ROUTE = (uuid: string) => `http://localhost:8080/patient/${uuid}/update`;
export const CREATE_PATIENT_ROUTE = "http://localhost:8080/patient";

// user
export const GET_USER_INFO_ROUTE = "/user";

// notes
export const GET_NOTES_ROUTE = (uuid: string) => `http://localhost:8080/notes/patient/${uuid}`;
export const GET_NOTES_BY_DOCTOR_ROUTE = (id: string) => `http://localhost:8080/notes/doctor/${id}`;
export const GET_NOTE_ROUTE = (id: string) => `http://localhost:8080/note/${id}`;
export const UPDATE_NOTE_ROUTE = (id: string) => `http://localhost:8080/note/${id}/update`;
export const CREATE_NOTE_ROUTE = (patientUuid: string) => `http://localhost:8080/note/patient/${patientUuid}`;

// report
export const GET_REPORT_ROUTE = (uuid: string) => `http://localhost:8080/report/${uuid}`