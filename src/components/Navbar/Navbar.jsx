import React from 'react';
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import userImg from '../../assets/images/user.png';
import './Navbar.scss';
import logo from '../../assets/images/f.imm/NewLogo.svg';
import logo_black from '../../assets/images/f.imm/logo_black.svg';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { useScroll } from '../../components/Scroll/ScrollContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { setScrollTo } = useScroll();

  const handleClick = () => navigate('/Contatti');
  const handleLockClick = () => navigate('/login');
  const handleCertificazioniClick = () => {
    setScrollTo("certificazioni");
    navigate("/ChiSiamo");
  };

  const isSolution = location.pathname === '/Prodotti';
  const containerClass = `container_1${isSolution ? '--prodotti' : ''}`;

  return (
    <div className={containerClass}>
      <nav className="navbar">
        <div className="navbar__logo">
          <Link to={'/'}>
            <img src={isSolution ? logo_black : logo} alt="Logo fimm" />
          </Link>
        </div>
        <menu className="navbar__menu">
          <ul className="navbar__list">
            <li className="navbar__item">
              <NavLink className="navbar__link" to="/">Home</NavLink>
            </li>
            <li className="navbar__item navbar__item--dropdown">
              <span className="navbar__link">Chi Siamo</span>
              <div className="navbar__dropdown">
                <NavLink className="navbar__dropdown-link" to="/ChiSiamo">La nostra storia</NavLink>
                <a style={{ cursor: "pointer" }} 
                  className="navbar__dropdown-link"
                  onClick={handleCertificazioniClick}
                >
                  Certificazioni
                </a>
              </div>
            </li>
            <li className="navbar__item navbar__item--dropdown">
              <span className="navbar__link">Soluzioni</span>
              <div className="navbar__dropdown">
                <NavLink className="navbar__dropdown-link" to="/Prodotti">Prodotti</NavLink>
                <NavLink className="navbar__dropdown-link" to="/Servizi">Servizi</NavLink>
              </div>
            </li>
            <li className="navbar__item">
              <NavLink className="navbar__link" to="/LavoraConNoi">Lavora con noi</NavLink>
            </li>
          </ul>
        </menu>
        <div className="navbar__actions">
          <motion.div className="box" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <button className="navbar__btn" onClick={handleClick}>Contattaci</button>
          </motion.div>
          <motion.div className="navbar__padlock" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <img
              src={userImg}
              alt="User"
              className="navbar__userImage"
              onClick={handleLockClick}
            />
          </motion.div>
          {user && <span>{user.email}</span>}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
