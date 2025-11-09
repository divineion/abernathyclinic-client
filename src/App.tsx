import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Patients from "./features/patient/Patients";
import Patient from "./features/patient/Patient.tsx";
import Login from "./features/login/Login.tsx";
import {useEffect} from "react";
import type {AppDispatch, RootState} from "./app/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {setId, setIsLoggedIn, setRole, setToken, setUsername} from "./features/login/userSlice.ts";
import Navbar from "./common/components/Navbar.tsx";
import Toast from "./features/snackbar/Toast.tsx";

const App = () => {
    const dispatch = useDispatch<AppDispatch>()

    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const role = localStorage.getItem("role");
        const id = localStorage.getItem("id");
        const username = localStorage.getItem("username")
        if (token) {
            dispatch(setToken(token))
            dispatch(setIsLoggedIn(true))
            if (role) {
                dispatch(setRole(role))
            }
            if (id) {
                dispatch(setId(id))
            }
            if (username) {
                dispatch(setUsername(username))
            }
        }
    }, [dispatch]);
    return (
        <BrowserRouter>
            <Navbar/>
            <Toast/>
            <Routes>
                <Route path="/" element={ isLoggedIn ? <Patients/> : <Login/>}/>
                <Route path="/patients" element={isLoggedIn ? <Patients/> : <Login/>}/>
                <Route path="/patient/:uuid" element={isLoggedIn ? <Patient /> : <Login/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;