import logo from '../assets/Logo.png';
import background from '../assets/background-map.png';
import '../Styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import UserContext from '../Store/UserContext';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext)!;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <>
      <header className="header" style={{ backgroundImage: `url(${background})` }}>
        <div className="navbar-container">
          {/* logo */}
          <Link to="/" className="nav-brand">
            Global Guide
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="nav-toggle">
            <FontAwesomeIcon icon={faBars} className="nav-icon" />
          </button>
          {/* nav */}
          <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
            <ul>
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              {user && (
                <li>
                  <Link to="/favorite" className="nav-link">
                    Favorite
                  </Link>
                </li>
              )}
              {/* action */}
              <li className="dropdown">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="btn dropdown-btn">
                  {user ? (
                    <>
                      <span className="username">{user}</span>
                      <span className="arrow">▼</span>
                    </>
                  ) : (
                    <Link to="/login" className="login-link">
                      Login
                    </Link>
                  )}
                </button>
                {user && dropdownOpen && (
                  <div className="dropdown-menu-with-arrow">
                    <div className="dropdown-arrow" />
                    <button onClick={handleLogout} className="dropdown-link">
                      Log out
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
        <img src={logo} alt="Logo" />
      </header>
    </>
  );
}

export default Header;
