import Button from "./Button.tsx";
import {logout} from "../../features/login/loginThunk.ts"
import {useDispatch, useSelector} from "react-redux"
import type {AppDispatch, RootState} from "../../app/store.ts"
import {useNavigate} from "react-router-dom"
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const username = useSelector((state: RootState) => state.user.username)

    const handleLogoutButtonClick = () => {
        dispatch(logout())
        navigate("/")
    }
    return (
        <>
            <nav className={"user-actions"} aria-label={"User menu"}>
                <Button
                    type={"button"}
                    handleClick={handleLogoutButtonClick}
                    ariaLabel={"déconnexion"}
                    title={"déconnexion"}
                    className={"btn"}
                >
                    <Logout/>
                </Button>
                <Button
                    type={"button"}
                    className={"btn"}
                    title={"Vous êtes connecté en tant que " + username}
                    ariaLabel={"Vous êtes connecté en tant que " + username}
                >
                    <AccountCircleIcon/>
                </Button>
            </nav>
        </>
    )
}

export default Navbar