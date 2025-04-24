import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LavoraConNoi.scss';
import { useUser } from '../../context/UserContext'

const { VITE_BACKEND_URL } = import.meta.env;

const LavoraConNoi = () => {
  const [jobs, setJobs] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingJobId, setEditingJobId] = useState(null);
  const [editJob, setEditJob] = useState({
    title: '',
    description: '',
    ideal_profile: '',
    site: '',
    contract: ''
  });
  const { user } = useUser(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/offers`);
        setJobs(response.data);
      } catch (error) {
        console.error('Errore durante il recupero delle offerte di lavoro:', error);
        setError('Errore durante il recupero delle offerte di lavoro');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();

    // Controlla se c'è un token e imposta isAuthenticated a true
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const deleteJob = async (id) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Devi essere autenticato per eliminare un\'offerta');
      return;
    }

    try {
      await axios.delete(`${VITE_BACKEND_URL}/offers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error('Errore durante l\'eliminazione dell\'offerta di lavoro:', error);
      setError('Errore durante l\'eliminazione dell\'offerta di lavoro');
    }
  };

  const startEditing = (job) => {
    if (!user) {
      setError('Devi essere autenticato per modificare un\'offerta');
      return;
    }
    setEditingJobId(job._id);
    setEditJob({
      title: job.title,
      description: job.description,
      ideal_profile: job.ideal_profile,
      site: job.site,
      contract: job.contract,
    });
  };

  const updateJob = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Devi essere autenticato per aggiornare un\'offerta');
      return;
    }

    try {
      const response = await axios.patch(`${VITE_BACKEND_URL}/offers/${editingJobId}`, editJob, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.map((job) => (job._id === editingJobId ? response.data : job)));
      setEditingJobId(null);
      setEditJob({
        title: '',
        description: '',
        ideal_profile: '',
        site: '',
        contract: ''
      });
    } catch (error) {
      console.error('Errore durante l\'aggiornamento dell\'offerta di lavoro:', error);
      setError('Errore durante l\'aggiornamento dell\'offerta di lavoro');
    }
  };

  return (
    <>
      {isLoading && <span>Caricamento...</span>}
      {error && <span>Errore caricamento: {error}</span>}
      {!isLoading && !error && (
        <div className="lavora-con-noi">
          <h1>Lavora con noi</h1>
          {user && <>
            <button onClick={() => navigate('/CreaOfferta')} className="add-job-button">
              Aggiungi una nuova offerta di lavoro
            </button>
          </>}
          
          <ul>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <li key={job._id}>
                  <Link to={`/offers/${job._id}`} className="job-card">
                    <img src={job.image} alt={job.title} />
                    <h2>{job.title}</h2>
                  </Link>
                </li>
              ))
            ) : (
              <p>Nessuna offerta di lavoro disponibile</p>
            )}
          </ul>
          {/* Mostra il form di modifica solo se l'utente è autenticato */}
          {editingJobId && user && (
            <form onSubmit={updateJob} className="form-container">
              <h2>Modifica offerta di lavoro</h2>
              <input 
                type="text" 
                placeholder="Titolo" 
                value={editJob.title}
                onChange={(e) => setEditJob({ ...editJob, title: e.target.value })}
              />
              <textarea 
                placeholder="Descrizione" 
                value={editJob.description}
                onChange={(e) => setEditJob({ ...editJob, description: e.target.value })}
              />
              <input 
                type="text" 
                placeholder="Profilo Ideale" 
                value={editJob.ideal_profile}
                onChange={(e) => setEditJob({ ...editJob, ideal_profile: e.target.value })}
              />
              <input 
                type="text" 
                placeholder="Sito" 
                value={editJob.site}
                onChange={(e) => setEditJob({ ...editJob, site: e.target.value })}
              />
              <input 
                type="text" 
                placeholder="Contratto" 
                value={editJob.contract}
                onChange={(e) => setEditJob({ ...editJob, contract: e.target.value })}
              />
              <button type="submit">Aggiorna Offerta</button>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default LavoraConNoi;
