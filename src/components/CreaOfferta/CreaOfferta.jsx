import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreaOfferta.scss';
import { useUser } from '../../context/UserContext'; // Importa il contesto utente

const { VITE_BACKEND_URL } = import.meta.env;

const CreaOfferta = () => {
  const { user } = useUser(); // Recupera l'utente loggato dal contesto
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    ideal_profile: '',
    site: '',
    contract: '',
    image: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addJob = async (e) => {
    e.preventDefault();

    try {
      // Aggiungi l'ID dell'utente loggato come author
      const jobWithAuthor = {
        ...newJob,
        author: user._id // Assumi che `user._id` sia l'ID dell'utente loggato
      };

      const response = await axios.post(`${VITE_BACKEND_URL}/offers`, jobWithAuthor, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      navigate(`/offers/${response.data._id}`);
    } catch (error) {
      console.error('Errore durante la creazione della nuova offerta di lavoro:', error);
      setError('Errore durante la creazione della nuova offerta di lavoro');
    }
  };

  return (
    <div className="crea-offerta">
      <h1>Crea una Nuova Offerta di Lavoro</h1>
      {error && <span className="error-message">Errore: {error}</span>}
      <form onSubmit={addJob} className="form-container">
        <input 
          type="text" 
          placeholder="Titolo" 
          value={newJob.title}
          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
        />
        <textarea 
          placeholder="Descrizione" 
          value={newJob.description}
          onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Profilo Ideale" 
          value={newJob.ideal_profile}
          onChange={(e) => setNewJob({ ...newJob, ideal_profile: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Sede" 
          value={newJob.site}
          onChange={(e) => setNewJob({ ...newJob, site: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Contratto" 
          value={newJob.contract}
          onChange={(e) => setNewJob({ ...newJob, contract: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="URL Immagine" 
          value={newJob.image}
          onChange={(e) => setNewJob({ ...newJob, image: e.target.value })}
        />
        <button type="submit">Crea Offerta</button>
      </form>
      <a href="/lavora-con-noi" className="back-link">Torna alla pagina delle offerte</a>
    </div>
  );
};

export default CreaOfferta;
