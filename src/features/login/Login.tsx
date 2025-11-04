import LoginForm from "./LoginForm.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../app/store.ts";

const Login = () => {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)

    return(<>
        { !isLoggedIn && <LoginForm/> }
    </>);
}

export default Login;