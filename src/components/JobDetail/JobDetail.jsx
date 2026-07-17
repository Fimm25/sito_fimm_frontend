import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';

import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading';
import LoadingError from '../../components/SpinnerLoading/LoadingError';

import './JobDetail.scss';

const { VITE_BACKEND_URL } = import.meta.env;

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setError(null);

        const response = await axios.get(
            `${VITE_BACKEND_URL}/offers/${id}`
        );

        setJob(response.data);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (!isDeleting) {
      setOpen(false);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setOpen(false);
      setError('Devi essere autenticato per eliminare un’offerta');
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);

      await axios.delete(
          `${VITE_BACKEND_URL}/offers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
      );

      setOpen(false);
      navigate('/LavoraConNoi');
    } catch (error) {
      console.error(
          'Errore durante l’eliminazione dell’offerta:',
          error.response?.data || error
      );

      setOpen(false);

      setError(
          error.response?.data?.message ||
          'Errore durante l’eliminazione dell’offerta di lavoro'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (error) {
    return <LoadingError message={error} />;
  }

  if (!job) {
    return (
        <LoadingError message="Offerta di lavoro non trovata" />
    );
  }

  return (
      <>
        <main className="job-detail">
          <h1>{job.title}</h1>

          {job.image && (
              <img
                  src={job.image}
                  alt={job.title}
                  className="job-detail__image"
              />
          )}

          <section className="job-detail__content">
            <div className="job-markdown-section">
              {job.description ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {job.description}
                  </ReactMarkdown>
              ) : (
                  <p>Nessuna descrizione disponibile.</p>
              )}
            </div>

            <div className="job-markdown-section">
              <h2>Profilo ideale</h2>

              {job.ideal_profile ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {job.ideal_profile}
                  </ReactMarkdown>
              ) : (
                  <p>Nessun profilo ideale specificato.</p>
              )}
            </div>

            <div className="job-information">
              <p>
                <strong>Sede:</strong>{' '}
                {job.site || 'Non specificata'}
              </p>

              <p>
                <strong>Contratto:</strong>{' '}
                {job.contract || 'Non specificato'}
              </p>
            </div>

            {user && (
                <div className="button-container">
                  <Link to={`/EditJob/${id}`}>
                    <Button
                        variant="contained"
                        color="secondary"
                    >
                      Modifica
                    </Button>
                  </Link>

                  <Button
                      variant="contained"
                      color="error"
                      onClick={handleClickOpen}
                  >
                    Elimina
                  </Button>
                </div>
            )}
          </section>

          <div className="job__buttons">
            <motion.div
                className="box"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 10
                }}
            >
              <Link to="/LavoraConNoi">
                <Button className="job__button job__button--job">
                  Torna alla lista
                </Button>
              </Link>
            </motion.div>

            <motion.div
                className="box"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 10
                }}
            >
              <Link to="/Contatti">
                <Button className="job__button job__button--contact">
                  Contattaci
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="delete-job-dialog-title"
            aria-describedby="delete-job-dialog-description"
        >
          <DialogTitle id="delete-job-dialog-title">
            Conferma eliminazione
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="delete-job-dialog-description">
              Sei sicuro di voler eliminare questa offerta?
              Questa operazione non può essere annullata.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
                onClick={handleClose}
                color="primary"
                disabled={isDeleting}
            >
              No
            </Button>

            <Button
                onClick={handleDelete}
                color="error"
                disabled={isDeleting}
                autoFocus
            >
              {isDeleting ? 'Eliminazione...' : 'Sì, elimina'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
  );
};

export default JobDetail;