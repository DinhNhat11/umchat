import { useState, useContext} from "react";
import { LocationContext } from "../../contexts/locationContext";
import "./login.css";

function Login() {
    const { toggleLoggedIn } = useContext(LocationContext);
    const handleLogin = (e) => {
        e.preventDefault();
        toggleLoggedIn();
    }

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleLogin}>
                <div className="username">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                </div>
                <div className="submit">
                    <button type="submit">Login</button>
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
            {mode === "login" ? <Login /> : <SignUp />}
        </div>
    )
}