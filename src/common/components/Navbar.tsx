import Button from "./Button.tsx";
import {logout} from "../../features/login/loginThunk.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../app/store.ts";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const handleLogoutButtonClick = () => {
        dispatch(logout())
        navigate("/")
    }
    return (
        <>
            <nav className={"container"}>
                <Button handleClick={handleLogoutButtonClick} value={"x"} ariaLabel={"déconnexion"}
                        title={"déconnexion"} className={"btn"}/>
            </nav>
        </>
    )
}

export default Navbar