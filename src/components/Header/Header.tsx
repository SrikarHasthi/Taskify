import React from "react";
import "./Header.scss";
import logo from "../../assets/logo2.png";
import { useAuth } from "../../AuthContext";

const Header = () => {
    const authContext = useAuth();

    const handleLogout = () => {
        authContext.logout();
    }

    return (
        <div className="main-header-container">
            <div className="main-header-logo-image">
                <img src={logo} alt="logo" />
            </div>
            <div className="main-header-app-name">Taskify</div>
            <div className="main-header-logout" onClick={handleLogout}>Logout</div>
        </div>
    )
}

export default Header;