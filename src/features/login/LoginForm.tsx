import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {getUserToken} from "./loginThunk.ts";
import type {AppDispatch} from "../../app/store.ts";

const LoginForm = (
) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // typer le dispatch pour qu’il accepte les thunks
    const dispatch = useDispatch<AppDispatch>();

    const handleUsernameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        dispatch(getUserToken(username, password))
    }

    return (
        <form className={"flex flex-column"} onSubmit={handleFormSubmit}>
            <label htmlFor="username">Nom d'utilisateur</label>
            <input id={"username"} value={username} type="text" onChange={handleUsernameInputChange} autoComplete={"on"} />

            <label htmlFor="password">Mot de passe</label>
            <input id={"password"} value={password} type="password" onChange={handlePasswordInputChange}/>

            <input type={"submit"}/>
        </form>
    )
}

export default LoginForm;