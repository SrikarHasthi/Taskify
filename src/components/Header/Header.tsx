import React from "react";
import "./Header.scss";
import logo from "../../assets/logo2.png";

const Header = () => {
    return (
        <div className="main-header-container">
            <div className="main-header-logo-image">
                <img src={logo} alt="logo" />
            </div>
            <div className="main-header-app-name">Taskify</div>
        </div>
    )
}

export default Header;