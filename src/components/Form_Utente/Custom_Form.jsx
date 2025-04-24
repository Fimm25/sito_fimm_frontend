import React from 'react';
import './Custom_Form.css';
import image_next from '../../assets/images/f.imm/next.svg';

const Custom_Form = ({ nomeCampi, image, title, description, link, imageUpload }) => {
  return (
    <div className="form_container">
      {/* Sezione sinistra con immagine e informazioni */}
      <div className="left_side">
        {image && <img src={image} alt="Form Illustration" className="form_image" />}
        {title && <h2 className="form_title">{title}</h2>}
        {description && <p className="form_description">{description}</p>}
        {link && <a href={link} className="form_link" target="_blank" rel="noopener noreferrer">{link}</a>}
        <img src={image_next} className='form_image_2' alt="Next Step" />
      </div>

      {/* Sezione destra con il form */}
      <div className="right_side">
        <form className="form">
          {nomeCampi.map((campo, index) => (
            <div className="form_field" key={index}>
              <label htmlFor={`campo_${index}`}>{campo}</label>
              <input type="text" id={`campo_${index}`} name={`campo_${index}`} required />
            </div>
          ))}

          {/* Input per caricamento immagine */}
          {imageUpload && (
            <div className="form_field">
              {imageUpload}
            </div>
          )}

          {/* Checkbox per termini e condizioni */}
          <div className="form_checkbox">
            <input type="checkbox" id="agree_terms" name="agree_terms" required />
            <label htmlFor="agree_terms">Accetto i termini e le condizioni</label>
          </div>

          {/* Bottone di invio */}
          <button type="submit" className="form_submit">Invia</button>
        </form>
      </div>
    </div>
  );
};

export default Custom_Form;
