import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Patients from "./features/patient/Patients";
import Patient from "./features/patient/Patient.tsx";
import Login from "./features/login/Login.tsx";
import {useEffect} from "react";
import type {AppDispatch} from "./app/store.ts";
import {useDispatch} from "react-redux";
import {setIsLoggedIn, setToken} from "./features/login/userSlice.ts";
import {setIsLoggedIn, setRole, setToken} from "./features/login/userSlice.ts";

const App = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const role = localStorage.getItem("role");
        if (token) {
            dispatch(setToken(token))
            dispatch(setIsLoggedIn(true))
            if (role) {
                dispatch(setRole(role))
            }
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