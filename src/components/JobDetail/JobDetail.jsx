import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useUser } from '../../context/UserContext'
import { motion } from 'framer-motion';
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'; // import dello spinner loading
import LoadingError from '../../components/SpinnerLoading/LoadingError'; // import dell'errore caricamento

import './JobDetail.scss'; // Stili specifici per la pagina di dettaglio

const { VITE_BACKEND_URL } = import.meta.env;

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false); // Stato per gestire il dialogo
  const navigate = useNavigate();
  const { user } = useUser(); 
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${VITE_BACKEND_URL}/offers/${id}`);
      setOpen(false);
      alert("Offerta eliminata correttamente");
      navigate('/LavoraConNoi'); 
    } catch (error) {
      console.error('Errore durante l\'eliminazione dell\'offerta di lavoro:', error);
      setError('Errore durante l\'eliminazione dell\'offerta di lavoro');
    }
  };

  return (
    <>
      {isLoading && <SpinnerLoading />}
      {error && <LoadingError message={error} />}
      {job && (
        <div className="job-detail">
          
          <h1>{job.title}</h1>
          <img src={job.image} alt={job.title} />
          <section>
            <p><b>Descrizione:</b> {job.description}</p>
            <p><b>Profilo Ideale:</b> {job.ideal_profile}</p>
            <p><b>Sito:</b> {job.site}</p>
            <p><b>Contratto:</b> {job.contract}</p>
            <div className="button-container">
              {user && <>
              <Link to={`/EditJob/${id}`}>
                <Button variant="contained" color="secondary">Modifica</Button>
              </Link>
              <Button variant="contained" color="error" onClick={handleClickOpen}>Elimina</Button>
              </>}
            </div>
          </section>

          <div className="job__buttons">
            <motion.div
              className="box"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/LavoraConNoi">
            <Button className='job__button job__button--job'>Torna alla lista</Button>
          </Link>
            </motion.div>

            <motion.div
              className="box"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/Contatti">
            <Button className='job__button job__button--contact'>Contattaci</Button>
          </Link>
            </motion.div>
          </div>
        </div>
      )}

      {/* Dialogo di conferma per l'eliminazione */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Conferma Eliminazione"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sei sicuro di voler eliminare questa offerta?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Sì
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JobDetail;
