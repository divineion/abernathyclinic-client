import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Patients from "./features/patient/Patients";
import Patient from "./features/patient/Patient.tsx";

// je définis le routing url => component
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/patients" element={<Patients/>}/>
                <Route path="/patient/:uuid" element={<Patient />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;