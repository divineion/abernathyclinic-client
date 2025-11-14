import type {AppDispatch} from "../../app/store.ts";
import {isAxiosError} from "axios";
import {setToast} from "../snackbar/toastSlice.ts";
import {getReport} from "../../services/report.ts";
import {setReport} from "./reportSlice.ts";

const getReportErrorMessage = (error: unknown) => {
    if (isAxiosError(error)) {
        switch (error.response?.status) {
            case 400: return "Requête invalide";
            case 401: return "Vous n'êtes pas autorisé";
            case 404: return "Rapport non trouvé";
            case 500: return "Erreur serveur, veuillez réessayer plus tard";
            default: return `Erreur inattendue (${error.response?.status})`;
        }
    }
    return "Une erreur est survenue lors de la génération du rapport";
}

export const generateReport = (patientUuid: string) => async (dispatch: AppDispatch)=> {
    try {
        const report = await getReport(patientUuid)

        if (report) {
            dispatch(setReport(report))
        }

    } catch (error) {
        dispatch(setToast({
            open: true,
            variant: "error",
            message: getReportErrorMessage(error)
        }))
    }
}