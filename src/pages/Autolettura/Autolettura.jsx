import React, { useState } from 'react';
import './Autolettura.css';
import Custom_Form from '../../components/Form_Utente/Custom_Form';
import image from '../../assets/images/f.imm/form_image.svg';

const Autolettura = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const nomeCampi = ['Codice Utente', 'Matricola', 'E-mail', 'Telefono', 'Lettura'];
    const link = 'Informativa Privacy';
    const title = 'Inserisci la tua autolettura!';
    const description = 'Completa tutti i campi a destra per poterci inviare il tuo consumo';

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    return (
        <div className='autolettura_container'>
            <Custom_Form 
                nomeCampi={nomeCampi}
                image={image}
                link={link}
                description={description}
                title={title}
                imageUpload={
                    <div className="image-upload">
                        <label htmlFor="image">Carica Immagine:</label>
                        <input 
                            type="file" 
                            id="image" 
                            accept="image/jpeg" 
                            required 
                            onChange={handleImageChange} 
                        />
                        {selectedImage && <p>Immagine selezionata: {selectedImage.name}</p>}
                    </div>
                }
            />
        </div>
    );
};

export default Autolettura;
