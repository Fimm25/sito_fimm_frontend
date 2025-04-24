import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditJob.scss'; // Stili specifici per la pagina di modifica

const { VITE_BACKEND_URL } = import.meta.env;

const EditJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState({
    title: '',
    description: '',
    ideal_profile: '',
    site: '',
    contract: '',
    image: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/offers/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error('Errore durante il recupero dei dettagli dell\'offerta di lavoro:', error);
        setError('Errore durante il recupero dei dettagli dell\'offerta di lavoro');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({ ...prevJob, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await axios.patch(`${VITE_BACKEND_URL}/offers/${id}`, job, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setMessage('Offerta di lavoro aggiornata con successo');
      navigate(`/offers/${id}`);
    } catch (error) {
      if (error.response) {
        console.error('Errore risposta:', error.response.data);
        setError(`Errore: ${error.response.data.message || 'Errore durante l\'aggiornamento dell\'offerta di lavoro'}`);
      } else if (error.request) {
        console.error('Nessuna risposta dal server:', error.request);
        setError('Nessuna risposta dal server. Controlla la connessione o riprova più tardi.');
      } else {
        console.error('Errore:', error.message);
        setError('Si è verificato un errore nella richiesta. Riprova.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {isLoading && <span>Caricamento...</span>}
      {error && <span>Errore: {error}</span>}
      {message && <span>Successo: {message}</span>}
      {!isLoading && !error && (
        <div className="edit-job">
          <h1>Modifica Offerta di Lavoro</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Titolo</label>
            <input 
              type="text" 
              name="title" 
              id="title"
              value={job.title}
              onChange={handleChange}
              placeholder="Titolo"
            />

            <label htmlFor="description">Descrizione</label>
            <textarea 
              name="description" 
              id="description"
              value={job.description}
              onChange={handleChange}
              placeholder="Descrizione"
            />

            <label htmlFor="ideal_profile">Profilo Ideale</label>
            <input 
              type="text" 
              name="ideal_profile" 
              id="ideal_profile"
              value={job.ideal_profile}
              onChange={handleChange}
              placeholder="Profilo Ideale"
            />

            <label htmlFor="site">Sede</label>
            <input 
              type="text" 
              name="site" 
              id="site"
              value={job.site}
              onChange={handleChange}
              placeholder="Sito"
            />

            <label htmlFor="contract">Contratto</label>
            <input 
              type="text" 
              name="contract" 
              id="contract"
              value={job.contract}
              onChange={handleChange}
              placeholder="Contratto"
            />
            <label htmlFor="image">Immagine</label>
            <input 
                type="url" 
                name="image"
                placeholder="URL Immagine" 
                 value={job.image}
                onChange={handleChange}
            />

            <button type="submit" disabled={isSaving}>
              {isSaving ? 'Salvataggio...' : 'Salva Modifiche'}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditJob;
