import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Patients from "./features/patient/Patients";
import Patient from "./features/patient/Patient.tsx";
import Login from "./features/login/Login.tsx";
import {useEffect} from "react";
import type {AppDispatch} from "./app/store.ts";
import {useDispatch} from "react-redux";
import {setIsLoggedIn, setToken} from "./features/login/userSlice.ts";

// je définis le routing url => component
const App = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            dispatch(setToken(token));
            dispatch(setIsLoggedIn(true));
        }
    }, [dispatch]);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/patients" element={<Patients/>}/>
                <Route path="/patient/:uuid" element={<Patient />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;