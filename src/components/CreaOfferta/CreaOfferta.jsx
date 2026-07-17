import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './CreaOfferta.scss';
import { useUser } from '../../context/UserContext';

const { VITE_BACKEND_URL } = import.meta.env;

const CreaOfferta = () => {
  const { user } = useUser();

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
    setError(null);

    if (!user?._id) {
      setError('Devi essere autenticato per creare un’offerta');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const jobWithAuthor = {
        ...newJob,
        author: user._id
      };

      const response = await axios.post(
          `${VITE_BACKEND_URL}/offers`,
          jobWithAuthor,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
      );

      navigate(`/offers/${response.data._id}`);
    } catch (error) {
      console.error(
          'Errore durante la creazione della nuova offerta:',
          error.response?.data || error
      );

      setError(
          error.response?.data?.message ||
          'Errore durante la creazione della nuova offerta di lavoro'
      );
    }
  };

  return (
      <div className="crea-offerta">
        <h1>Crea una nuova offerta di lavoro</h1>

        {error && (
            <span className="error-message">
          Errore: {error}
        </span>
        )}

        <form onSubmit={addJob} className="form-container">
          <input
              type="text"
              placeholder="Titolo"
              value={newJob.title}
              onChange={(e) =>
                  setNewJob({
                    ...newJob,
                    title: e.target.value
                  })
              }
              required
          />

          <div className="markdown-field">
            <label htmlFor="description">Descrizione</label>

            <textarea
                id="description"
                placeholder={`Scrivi la descrizione usando Markdown.

Esempio:

## Responsabilità

- Sviluppo applicazioni React
- Collaborazione con il team
- Manutenzione del codice

## Cosa offriamo

- **Contratto stabile**
- Smart working
- Formazione continua`}
                value={newJob.description}
                onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      description: e.target.value
                    })
                }
                rows={14}
                required
            />

            <div className="markdown-help">
            <span>
              <strong>grassetto:</strong> **testo**
            </span>

              <span>
              <strong>elenco:</strong> - elemento
            </span>

              <span>
              <strong>titolo:</strong> ## Titolo
            </span>
            </div>
          </div>

          <div className="markdown-field">
            <label htmlFor="ideal-profile">Profilo ideale</label>

            <textarea
                id="ideal-profile"
                placeholder={`Esempio:

## Requisiti

- Esperienza con **React**
- Conoscenza di JavaScript
- Capacità di lavorare in team
- Buona conoscenza di Git`}
                value={newJob.ideal_profile}
                onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      ideal_profile: e.target.value
                    })
                }
                rows={10}
                required
            />
          </div>

          <input
              type="text"
              placeholder="Sede"
              value={newJob.site}
              onChange={(e) =>
                  setNewJob({
                    ...newJob,
                    site: e.target.value
                  })
              }
              required
          />

          <input
              type="text"
              placeholder="Contratto"
              value={newJob.contract}
              onChange={(e) =>
                  setNewJob({
                    ...newJob,
                    contract: e.target.value
                  })
              }
              required
          />

          <input
              type="url"
              placeholder="URL immagine"
              value={newJob.image}
              onChange={(e) =>
                  setNewJob({
                    ...newJob,
                    image: e.target.value
                  })
              }
          />

          <section className="markdown-preview">
            <h2>Anteprima dell’offerta</h2>

            {newJob.description ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {newJob.description}
                </ReactMarkdown>
            ) : (
                <p className="empty-preview">
                  Scrivi una descrizione per visualizzare l’anteprima.
                </p>
            )}

            {newJob.ideal_profile && (
                <>
                  <hr />

                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {newJob.ideal_profile}
                  </ReactMarkdown>
                </>
            )}
          </section>

          <button type="submit">
            Crea offerta
          </button>
        </form>

        <Link to="/lavora-con-noi" className="back-link">
          Torna alla pagina delle offerte
        </Link>
      </div>
  );
};

export default CreaOfferta;