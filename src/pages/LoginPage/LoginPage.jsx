import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import './loginPage.scss'; // Assicurati che il percorso sia corretto

const LoginPage = () => {
  // Ottieni logIn dal contesto
  const { logIn } = useUser();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Funzione per la gestione della modifica dei campi
  const changeData = (key, value) => setFormData(c => ({ ...c, [key]: value }));

  // Funzione per la gestione del login
  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const { email, password } = formData;

      // Invio della richiesta di login al backend
      await logIn(email, password);

      // Reindirizzamento alla pagina "Lavora con noi" in caso di successo
      navigate('/');
    } catch (error) {
      console.error('Errore durante il login:', error);
      setErrorMessage('Credenziali non valide. Riprova.');
    }
  };

  // Funzione per alternare la visibilità della password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Funzione per tornare alla home
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-page__overlay"></div>
      <div className="login-page__container">
        <h2 className="login-page__title">Accedi al tuo account</h2>
        <p className="login-page__txt">Area riservata al personale autorizzato</p>

        <form className="login-page__form" onSubmit={handleLogin}>
          <div className="login-page__field">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => changeData('email', e.target.value)}
              required 
            />
          </div>

          <div className="login-page__field">
            <label htmlFor="password">Password</label>
            <div className="login-page__password-wrapper">
              <input 
                type={showPassword ? "text" : "password"}  
                value={formData.password}
                onChange={(e) => changeData('password', e.target.value)}
                required 
              />
              <button 
                type="button" 
                className="login-page__toggle-password" 
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
              </button>
            </div>
          </div>

          {errorMessage && <p className="login-page__error">{errorMessage}</p>}

          <div className="login-page__buttons">
            <motion.div
              className="box"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <button 
                type="button" 
                onClick={handleHomeClick} 
                className="login-page__button login-page__button--home"
              >
                Torna alla Home
              </button>
            </motion.div>

            <motion.div
              className="box"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <button 
                type="submit" 
                className="login-page__button login-page__button--login"
              >
                Accedi all'area
              </button>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
