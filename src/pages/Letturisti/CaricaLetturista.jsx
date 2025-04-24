import React, { useState } from 'react';
import "./CaricaLetturista.scss";

const { VITE_BACKEND_URL } = import.meta.env;

const CaricaLetturista = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('surname', surname);
        formData.append('image', image);

        try {
            const response = await fetch(`${VITE_BACKEND_URL}/meterReader`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Errore nel caricamento del letturista');
            }

            const result = await response.json();
            console.log('Letturista caricato con successo:', result);
            setMessage('Letturista caricato con successo!');

            setName('');
            setSurname('');
            setImage(null);
        } catch (error) {
            console.error('Errore durante il caricamento:', error);
            setMessage('Errore durante il caricamento del letturista.');
        }
    };

    const handleImageRemove = () => {
        setImage(null);
    };

    return (
        <div className="carica-letturista-container">
            <h1>Carica Letturista</h1>
            {message && <p className="feedback-message">{message}</p>}
            <form onSubmit={handleSubmit} className="carica-letturista-form">
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input 
                        type="text" 
                        id="name" 
                        required 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div>
                    <label htmlFor="surname">Cognome:</label>
                    <input 
                        type="text" 
                        id="surname" 
                        required 
                        value={surname} 
                        onChange={(e) => setSurname(e.target.value)} 
                    />
                </div>
                <div>
                    <label htmlFor="image">Carica Immagine (JPG):</label>
                    <input 
                        type="file" 
                        id="image" 
                        accept="image/jpeg" 
                        required 
                        onChange={(e) => setImage(e.target.files[0])} 
                    />
                    {image && (
                        <div className="image-preview">
                            <img 
                                src={URL.createObjectURL(image)} 
                                alt="Anteprima" 
                                className="preview-image" 
                            />
                            <button type="button" onClick={handleImageRemove} className="remove-image">
                                ❌
                            </button>
                        </div>
                    )}
                </div>
                <button type="submit" className='submit_letturisti'>Invia</button>
            </form>
        </div>
    );
};

export default CaricaLetturista;
