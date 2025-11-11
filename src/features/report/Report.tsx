import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../app/store.ts";
import {useEffect} from "react";
import {generateReport} from "./reportThunk.ts";
const Report = ({patientUuid}: ReportProps) => {
    const report = useSelector((state: RootState) => state.report.patientReport)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (patientUuid && !report) {
            dispatch(generateReport(patientUuid))
        }
    }, [patientUuid, dispatch, report]);

    return (
        <div className={"section-limiter"}>
            <div>Rapport de risque de diabète</div>
            <div>Niveau de risque : {report?.riskLevel} </div>
        </div>
    )
}

type ReportProps = {
    patientUuid: string,
}

export default Report