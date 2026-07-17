import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import './EditJob.scss';
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading';
import LoadingError from '../../components/SpinnerLoading/LoadingError';

const { VITE_BACKEND_URL } = import.meta.env;

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setError(null);

        const response = await axios.get(
            `${VITE_BACKEND_URL}/offers/${id}`
        );

        setJob({
          title: response.data.title || '',
          description: response.data.description || '',
          ideal_profile: response.data.ideal_profile || '',
          site: response.data.site || '',
          contract: response.data.contract || '',
          image: response.data.image || ''
        });
      } catch (error) {
        console.error(
            'Errore durante il recupero dei dettagli dell’offerta:',
            error
        );

        setError(
            error.response?.data?.message ||
            'Errore durante il recupero dei dettagli dell’offerta di lavoro'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setJob((prevJob) => ({
      ...prevJob,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      setError('Devi essere autenticato per modificare un’offerta');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      await axios.patch(
          `${VITE_BACKEND_URL}/offers/${id}`,
          job,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
      );

      navigate(`/offers/${id}`);
    } catch (error) {
      console.error(
          'Errore durante l’aggiornamento dell’offerta:',
          error.response?.data || error
      );

      if (error.response) {
        setError(
            error.response.data?.message ||
            'Errore durante l’aggiornamento dell’offerta di lavoro'
        );
      } else if (error.request) {
        setError(
            'Nessuna risposta dal server. Controlla la connessione e riprova.'
        );
      } else {
        setError(
            'Si è verificato un errore durante la richiesta.'
        );
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (error) {
    return <LoadingError message={error} />;
  }

  return (
      <div className="edit-job">
        <h1>Modifica offerta di lavoro</h1>

        <form onSubmit={handleSubmit} className="edit-job__form">
          <label htmlFor="title">Titolo</label>

          <input
              type="text"
              name="title"
              id="title"
              value={job.title}
              onChange={handleChange}
              placeholder="Titolo"
              required
          />

          <label htmlFor="description">Descrizione</label>

          <textarea
              name="description"
              id="description"
              value={job.description}
              onChange={handleChange}
              placeholder={`Scrivi la descrizione usando Markdown.

Esempio:

## Responsabilità

- Sviluppo applicazioni React
- Collaborazione con il team
- Manutenzione del codice

## Cosa offriamo

- **Contratto stabile**
- Smart working`}
              rows={14}
              required
          />

          <div className="markdown-help">
          <span>
            Grassetto: <code>**testo**</code>
          </span>

            <span>
            Elenco: <code>- elemento</code>
          </span>

            <span>
            Titolo: <code>## Titolo</code>
          </span>
          </div>

          <label htmlFor="ideal_profile">Profilo ideale</label>

          <textarea
              name="ideal_profile"
              id="ideal_profile"
              value={job.ideal_profile}
              onChange={handleChange}
              placeholder={`Scrivi il profilo ideale usando Markdown.

Esempio:

## Requisiti

- Esperienza con **React**
- Conoscenza di JavaScript
- Capacità di lavorare in team`}
              rows={10}
              required
          />

          <label htmlFor="site">Sede</label>

          <input
              type="text"
              name="site"
              id="site"
              value={job.site}
              onChange={handleChange}
              placeholder="Sede"
              required
          />

          <label htmlFor="contract">Contratto</label>

          <input
              type="text"
              name="contract"
              id="contract"
              value={job.contract}
              onChange={handleChange}
              placeholder="Contratto"
              required
          />

          <label htmlFor="image">Immagine</label>

          <input
              type="url"
              name="image"
              id="image"
              value={job.image}
              onChange={handleChange}
              placeholder="URL immagine"
          />

          <section className="markdown-preview">
            <h2>Anteprima</h2>

            <div className="markdown-preview__section">
              <h3>Descrizione</h3>

              {job.description ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {job.description}
                  </ReactMarkdown>
              ) : (
                  <p>Nessuna descrizione inserita.</p>
              )}
            </div>

            <div className="markdown-preview__section">
              <h3>Profilo ideale</h3>

              {job.ideal_profile ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {job.ideal_profile}
                  </ReactMarkdown>
              ) : (
                  <p>Nessun profilo ideale inserito.</p>
              )}
            </div>
          </section>

          <button type="submit" disabled={isSaving}>
            {isSaving ? 'Salvataggio...' : 'Salva modifiche'}
          </button>
        </form>
      </div>
  );
};

export default EditJob;