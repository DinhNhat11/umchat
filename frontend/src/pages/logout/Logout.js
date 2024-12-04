import "./logout.css";
import { useContext } from "react";
import { LocationContext } from "../../contexts/locationContext";

export default function Logout() {
    const { setShowLogout, toggleLoggedIn } = useContext(LocationContext);
    return (
        <div className="logout-page">
            <h1>Logout</h1>
            <p>Are you sure you want to logout?</p>
            <div>
                <button onClick={() => {
                    toggleLoggedIn()
                    setShowLogout(false)
                    }
                }>Yes</button>
                <button onClick={() => setShowLogout(false)}>No</button>
            </div>
        </div>
    )
}