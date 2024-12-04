import { useState, useContext, useEffect} from "react";
import { LocationContext } from "../../contexts/locationContext";
import "./login.css";
import { UserContext, UserProvider } from "../../contexts/UserContext";
import { CSRFToken } from "../../components/CSRFToken";

function Login() {
    const [FormInput, setFormInput] = useState({
        username: "",
        password: ""
    });

    // const { toggleLoggedIn } = useContext(LocationContext);
    const { loginUser, user } = useContext(UserContext);

    useEffect(() => {
        console.log(user);
    }, [user])

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser(FormInput.username, FormInput.password);
    }

    const handleChange = (e) => {
        setFormInput({
            ...FormInput,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleLogin}>
                <CSRFToken />
                <div className="username">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={FormInput.username} onChange={handleChange}/>
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={FormInput.password} onChange={handleChange}/>
                </div>
                <div className="submit">
                    <button type="submit" onClick={handleLogin}>Login</button>
                </div>
            </form>
        </div>
    )
}

function SignUp() {
    const { toggleLoggedIn } = useContext(LocationContext);
    const handleLogin = (e) => {
        e.preventDefault();
        toggleLoggedIn();
    }

    return (
        <div className="signup-page">
            <form className="signup-form" onSubmit={handleLogin}>
                <div className="username">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div className="email">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                </div>
                <div className="confirm-password">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" name="confirm-password" />
                </div>
                <div className="submit">
                    <button type="submit">SignUp</button>
                </div> 
            </form>
        </div>
    )
}

export default function LoginSignUp() {
    const [mode, setMode] = useState("login");

    return (
        <div className="container-login-signup">
            <div className="login-signup-header">
                <button onClick={() => setMode("login")} className={mode === "login"? "active" : "not-active"}>Login</button>
                <button onClick={() => setMode("signup")} className={mode === "signup"? "active" : "not-active"}>Sign Up</button>
            </div>
            {mode === "login" ?
                <UserProvider>
                    <Login />
                </UserProvider>
                    : 
                <SignUp />}
        </div>
    )
}