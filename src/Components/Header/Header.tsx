import logo from "../../assets/Logo.png";
import background from "../../assets/background-map.png"
import "./Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";
import { useState } from "react";


function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false)
    
    return ( 
        <>
            <header className="header" style={{backgroundImage: `url(${background})`}}>
                <div className="navbar-container">
                    {/* logo */}
                    <Link   to="/" className="nav-brand">Global Guide</Link>
                    <button onClick={() => setIsOpen(!isOpen)} className="nav-toggle">
                    <FontAwesomeIcon icon={faBars} className="nav-icon" />
                    </button>
                    {/* nav */}
                        <div className={`nav-menu ${isOpen? 'open': ''}`}>
                            <ul>
                                <li>
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                <li>
                                    <Link to="/favorite" className="nav-link">Favorite</Link>
                                </li>
                                {/* action */}
                                <li className="dropdown">
                                    <button onClick={()=> setDropdownOpen(!dropdownOpen)} className="btn dropdown-btn">Login</button>
                                    {dropdownOpen && (
                                        <div className="dropdown-content">
                                            <Link to="/login" className="dropdown-link">Logout</Link>
                                            <Link to="/register" className="dropdown-link">Register</Link>
                                        </div>
                                    )}
                                </li>
                            </ul>
                        </div>
                </div>
                <img src={logo} alt="Logo" />
                <h2>Come see the world with us</h2>
            </header>
        </>
     );
     
}

export default Header
