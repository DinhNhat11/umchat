import { NavLink, useLocation } from "react-router-dom";
import { LocationContext } from "./contexts/locationContext";
import { useContext } from "react";

export default function Navbar() {
    const { setPrevLocation, setShowLogout } = useContext(LocationContext);
    const location = useLocation();

    const buttons = [
        {"name": "Profile", "link": "/profile", "img": "https://img.icons8.com/?size=100&id=7Ffvtg1xmgaV&format=png&color=000000"},
        {"name": "Direct-Message", "link": "/direct-message", "img": "https://img.icons8.com/?size=100&id=q2A5Thvw1p23&format=png&color=ffffff"},
        {"name": "Chatroom", "link": "/chatroom", "img": "https://img.icons8.com/?size=100&id=123773&format=png&color=ffffff"},
        {"name": "Create Chatroom", "link": "/create-chatroom", "img": "https://img.icons8.com/?size=100&id=OVI3sczm5NTI&format=png&color=ffffff"},    
        {"name": "Add Friend", "link": "/add-friend", "img": "https://img.icons8.com/?size=100&id=33662&format=png&color=ffffff"},    
        {"name": "Settings", "link": "/settings",  "img": "https://img.icons8.com/?size=100&id=364&format=png&color=ffffff"},
        {"name": "Logout", "link": "/logout", "img": "https://img.icons8.com/?size=100&id=2445&format=png&color=FA5252"}
    ]

    const navButtons = buttons.map((button, index) => {
        if (button.name === "Logout") {
            return (
                <button key={index} className="nav-button" onClick={()=>setShowLogout(true)}>
                    <img src={button.img} alt={button.name} />
                </button>
            )
        }
        return (
            <NavLink key={index} to={button.link} className="nav-button" onClick={()=>setPrevLocation(location.pathname)}>
                <img src={button.img} alt={button.name} />
            </NavLink>
        )
    });
    return (
        <div className="navbar">
            <div className="navbar-header">
                {navButtons[0]}    
            </div>
            <div className="navbar-body">
                {navButtons.slice(1, -2)}
            </div>
            <div className="navbar-footer">
                {navButtons.slice(-2)}
            </div>
        </div>
    )
}