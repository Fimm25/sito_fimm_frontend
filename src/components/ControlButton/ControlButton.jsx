import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './ControlButton.css';

const ControlButton = () => {
    const navigate = useNavigate(); // Inizializza navigate

    const handleControlClick = () => {
        navigate('/Investigator'); 
    };

    return (
        <div className="contenitore">
            <div className="center">
                <div>Sei un letturista?!</div>
                <button className="control-button" onClick={handleControlClick}>
                    CONTROLIAMO
                    <span className="new-badge">New!</span> {/* Aggiunta l'etichetta */}
                </button>           
            </div>
        </div>
    );
};

export default ControlButton;
