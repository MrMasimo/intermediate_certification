import {useAuthContext} from "../context/authContext";
import LoginRegistrationForm from "../components/Form/LoginRegistrationForm";
import {useNavigate} from "react-router-dom";

const serverPort = process.env.REACT_APP_SERVER_PORT
const serverAddress = `//localhost:${serverPort}`

interface LoginObjectInterface {
    email: string,
    password: string,
}

export default function LoginPage () {
    const {login} = useAuthContext();
    const navigate = useNavigate();

    const loginHandler = async ({email, password}: LoginObjectInterface) => {
        const payload = {email, password};

        try {
            const response = await fetch(`${serverAddress}/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload),
            })
            const {id, email} = await response.json()

            login({id, email}, () => {
                navigate("/pollution")
            })

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <h1>Вход</h1>

            <LoginRegistrationForm
                mode={'login'}
                submitHandler={loginHandler}
            />
        </>
    );
}
