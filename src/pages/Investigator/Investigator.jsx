import React, { useState } from 'react';
import './Investigator.scss';
import photo from '../../assets/images/user.png';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const Investigator = () => {
    const [matricola, setMatricola] = useState('');
    const [letturista, setLetturista] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const { user } = useUser(); // Ottieni l'oggetto user dal contesto

    const handleCheck = async () => {
        // Aggiungi la condizione per controllare se la matricola è vuota
        if (!matricola.trim()) {
            setMessage({ text: "Non hai inserito alcun campo valido", type: 'error' });
            return; // Esci dalla funzione se non ci sono dati
        }

        try {
            // Converti la matricola in maiuscolo
            const upperCaseMatricola = matricola.toUpperCase();
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/meterReader/${upperCaseMatricola}`);
            
            if (!response.ok) {
                throw new Error('Letturista non trovato');
            }
            
            const data = await response.json();
            setLetturista(data);
            setMessage({ text: "L'operatore è un nostro dipendente.", type: 'success' });
        } catch (error) {
            console.error('Errore durante la ricerca del letturista:', error);
            setMessage({ text: "Attenzione, l'operatore non è presente nei nostri sistemi!", type: 'error' });
        }
    };

    return (
        <>
            <div className='header-container'>
            <h1>⚠️ ATTENZIONE ALLE TRUFFE! ⚠️</h1>
                <p>Prima di fidarti, verifica sempre l'identità dell'operatore!</p>
                <p>Controlla che l'immagine corrisponda al volto della persona davanti a te, verifica il nome e la matricola.</p>
                <p>Inserisci il codice matricola qui sotto e clicca su "Controlla" per confermare la sua autenticità.</p>
                
            </div>
            <div className='control-container'>
                {user && (
                    <div className="admin-buttons">
                        <button className='control-button' onClick={() => navigate('/carica-letturista')}>CREA OPERATORE</button>
                        <button className='control-button' onClick={() => navigate('/letturisti')}>VISUALIZZA OPERATORI</button>
                    </div>
                )}

                <div className='control-image'>
                    <img 
                        src={letturista ? `data:${letturista.contentType};base64,${letturista.image}` : photo} 
                        alt="Letturista"
                        className="avatar-image"
                    />
                    {letturista && (
                        <div className="avatar-data">
                            <p>Nome: {letturista.name}</p>
                            <p>Cognome: {letturista.surname}</p>
                        </div>
                    )}
                </div>

                <div className="control-input">
                    <input
                        type="text"
                        name="matricola"
                        id="matricola"
                        placeholder="Inserisci matricola:"
                        value={matricola}
                        onChange={(e) => setMatricola(e.target.value)}
                        required
                    />
                </div>

                <button className='control-button' onClick={handleCheck}>CONTROLLA</button>

                {message && (
                    <div className={`message ${message.type === 'success' ? 'success' : 'error'}`}>
                        {message.text} {message.type === 'success' ? '✔️' : '❌'}
                    </div>
                )}
            </div>
        </>
    );
};

export default Investigator;
