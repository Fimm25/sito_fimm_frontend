import React from "react";
import { useNavigate } from "react-router-dom";
import './Manutenzione.scss';


const Manuntenzione = () => {
  const navigate = useNavigate();

  return (
    <div className="manutenzione-container">
      <div className="icon-container">
        <div className="icon">
          🛠️
        </div>
      </div>
      <h1 className="manutenzione-title">Servizio in Manutenzione...</h1>
      <p className="manutenzione-text">Stiamo lavorando per voi</p>
      <button className="home-button" onClick={() => navigate("/")}>
        Torna alla Home
      </button>
    </div>
  );
};

export default Manuntenzione;
