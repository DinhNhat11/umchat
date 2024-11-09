import { NavLink } from "react-router-dom";

export default function Navbar() {
    const buttons = [
        {"name": "Profile", "link": "/profile", "img": "https://img.icons8.com/?size=100&id=7Ffvtg1xmgaV&format=png&color=000000"},
        {"name": "Home", "link": "/", "img": "https://img.icons8.com/?size=100&id=86527&format=png&color=ffffff"},
        {"name": "Direct-Message", "link": "/directmessage", "img": "https://img.icons8.com/?size=100&id=q2A5Thvw1p23&format=png&color=ffffff"},
        {"name": "Chatroom", "link": "/chatroom", "img": "https://img.icons8.com/?size=100&id=123773&format=png&color=ffffff"},    
        {"name": "Settings", "link": "/settings",  "img": "https://img.icons8.com/?size=100&id=364&format=png&color=ffffff"},
        {"name": "Logout", "link": "/logout", "img": "https://img.icons8.com/?size=100&id=2445&format=png&color=FA5252"}
    ]

    const navButtons = buttons.map((button, index) => {
        return (
            <NavLink key={index} to={button.link} className="nav-button">
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