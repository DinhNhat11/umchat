import { useState, useContext, useEffect} from "react";
import { LocationContext } from "../../contexts/locationContext";
import "./login.css";
import { UserContext, UserProvider } from "../../contexts/UserContext";
import { CSRFToken } from "../../components/CSRFToken";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const { user, loginUser, isLoggedIn } = useContext(UserContext)
    const [FormInput, setFormInput] = useState({
        username: "",
        password: ""
    });

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         navigate("/chatroom")
    //     };
    // }, [isLoggedIn])

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
        <div className="login-page" action="http://localhost:8000/accounts/login">
            <form className="login-form" onSubmit={handleLogin} >
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
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

function SignUp() {
    const handleLogin = (e) => {
        e.preventDefault();
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
                <Login />
                    : 
                <SignUp />
            }
        </div>
    )
}