import React from 'react';
import './DatiContatto.css';
import Custom_Form from '../../components/Form_Utente/Custom_Form';
import image from '../../assets/images/f.imm/form_image.svg';

const DatiContatto = () => {
    const nomeCampi = ['Codice Utente', 'Matricola', 'E-mail', 'Telefono'];
    const link = 'Informativa Privacy';
    const title = 'Come preferisci essere contattato dal tuo fornitore del servizio idrico?'
    const description = 'Completa i campi a destra fornendoci i recapiti che verranno utilizzati esclusivamente per permettere al tuo ente di fornitura del servizio idrico di contattarti per informazioni sul tuo contratto';


  return (
    <div className='dati_container'>
        <Custom_Form 
            nomeCampi={nomeCampi}
            image={image}
            link={link}
            description={description}
            title={title}
        />
    </div>
  );
};

export default DatiContatto;