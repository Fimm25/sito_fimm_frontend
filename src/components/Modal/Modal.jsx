import React from 'react';
import './Modal.scss';
import { motion } from 'framer-motion';

const Modal = ({ isActive, onClose, content }) => {
  if (!isActive) return null; // Se il modal non è attivo, non renderizzare nulla.

  return (
    <div className="modal modal--active">
      <div className="modal__content modal__content--active">
        <div className="modal__header">
          <span className="modal__title">{content.title}</span>
          <span className="modal__close" onClick={onClose}>&times;</span>
        </div>
        <div className="modal__body">
          <img src={content.image} alt={content.title} style={{ width: '100%', borderRadius: '8px' }} />
          <p>{content.description}</p>
        </div>
        <div className="modal__footer">
        <motion.div
            className="box"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
            <button className="modal__button" onClick={onClose}>Chiudi</button>
        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
