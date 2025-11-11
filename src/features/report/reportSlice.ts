import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface Report {
    patientUuid: string,
    riskLevel: string
}

interface ReportState {
    patientReport: Report | null
}

const initialState: ReportState = {
    patientReport: null
}

export const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {
        setReport: (state, action: PayloadAction<Report>) => {
            state.patientReport = action.payload
        },
        clearReport: (state) => {
            state.patientReport = null
        }
    }
})

export const { setReport, clearReport } = reportSlice.actions

export default reportSlice.reducer