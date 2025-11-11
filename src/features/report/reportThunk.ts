import type {AppDispatch} from "../../app/store.ts";
import {isAxiosError} from "axios";
import {setToast} from "../snackbar/toastSlice.ts";
import {getReport} from "../../services/report.ts";
import {setReport} from "./reportSlice.ts";

export const generateReport = (patientUuid: string) => async (dispatch: AppDispatch)=> {
    try {
        const report = await getReport(patientUuid)

        if (report) {
            dispatch(setReport(report))
        }

    } catch (error) {
        if (isAxiosError(error)) {
            dispatch(setToast({open: true, variant: "error", message: error.message}))
        }
    }
}