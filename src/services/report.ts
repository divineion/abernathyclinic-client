import api from "./axiosConfig.ts";
import {isAxiosError} from "axios";
import {GET_REPORT_ROUTE} from "../utils/apiRoutes.ts";
import type {Report} from '../features/report/reportSlice.ts';

export const getReport = async (patientUuid: string): Promise<Report | null> => {
    try {
        const response = await api.get(GET_REPORT_ROUTE(patientUuid))

        return response.data
    } catch (error) {
        if (isAxiosError(error)) {
           throw new Error(error.message)
        }

        return null
    }
}
