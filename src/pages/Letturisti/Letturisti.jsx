import React, { useEffect, useState } from 'react';
import './Letturisti.scss';// Assicurati che i tuoi stili siano in questo file
import defaultPhoto from '../../assets/images/user.png';
const { VITE_BACKEND_URL } = import.meta.env;

const Letturisti = () => {
    const [letturisti, setLetturisti] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLetturisti, setSelectedLetturisti] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [selectedLetturista, setSelectedLetturista] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const [imageFile, setImageFile] = useState(null); // <-- AGGIUNTA


    useEffect(() => {
        const fetchLetturisti = async () => {
            try {
                const response = await fetch(`${VITE_BACKEND_URL}/meterReader`);
                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();
                setLetturisti(data);
                console.log(data)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchLetturisti();
    }, []);

    const handleEditClick = (letturista) => {
        setSelectedLetturista(letturista);
        setIsEditing(true);
        setNewImage(null);
    };

    const handleImageChange = async (e) => { // <-- AGGIUNTA
        const file = e.target.files?.[0];
        if (!file) return;

        // Converte in JPEG se necessario (multer accetta solo image/jpeg nel tuo POST;
        // nel PUT non è imposto, ma restiamo coerenti)
        const toJpeg = (file) =>
            new Promise((resolve) => {
                if (file.type === 'image/jpeg') return resolve(file);
                const reader = new FileReader();
                reader.onload = () => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        canvas.toBlob(
                            (blob) => {
                                resolve(
                                    new File([blob], file.name.replace(/\.[^/.]+$/, '') + '.jpg', {
                                        type: 'image/jpeg',
                                    })
                                );
                            },
                            'image/jpeg',
                            0.92
                        );
                    };
                    img.src = reader.result;
                };
                reader.readAsDataURL(file);
            });

        const jpegFile = await toJpeg(file);
        setImageFile(jpegFile);

        // Preview (data URL) per mostrare l’anteprima
        const r2 = new FileReader();
        r2.onloadend = () => setNewImage(r2.result);
        r2.readAsDataURL(jpegFile);
    };


    const handleSaveChanges = async () => { // <-- AGGIUNTA
        const formData = new FormData();
        formData.append('name', selectedLetturista.name);
        formData.append('surname', selectedLetturista.surname);

        const matricola = (selectedLetturista.matricola || '').trim().toUpperCase();

        if (imageFile) {
            formData.append('image', imageFile, imageFile.name); // <-- FILE, non base64
        }

        try {
            const response = await fetch(`${VITE_BACKEND_URL}/meterReader/${matricola}`, {
                method: 'PUT',
                body: formData, // non impostare manualmente Content-Type
            });

            if (!response.ok) throw new Error('Error updating meter reader');

            const updatedLetturista = await response.json();

            // Aggiorna la UI:
            // - Se hai scelto una nuova immagine, usa la preview (dataURL) per aggiornare subito la tabella
            // - Altrimenti mantieni quella già presente
            setLetturisti(prev =>
                prev.map(l =>
                    l.matricola === updatedLetturista.matricola
                        ? {
                            ...l,
                            ...updatedLetturista,
                            image: imageFile
                                ? (typeof newImage === 'string' ? newImage.split(',')[1] : l.image)
                                : selectedLetturista.image,
                            contentType: 'image/jpeg',
                        }
                        : l
                )
            );

            setIsEditing(false);
            setNewImage(null);
            setImageFile(null);
        } catch (error) {
            console.error('Error updating meter reader:', error);
        }
    };


    const handleSelectSingle = (matricola) => {
        setSelectedLetturisti(prev => ({
            ...prev,
            [matricola]: !prev[matricola],
        }));
    };
    const handleEnableSelected = async () => {
        const matricoleToEnable = Object.keys(selectedLetturisti).filter(matricola => selectedLetturisti[matricola]);

        if (matricoleToEnable.length === 0) {
            alert('Seleziona almeno un letturista da abilitare.');
            return;
        }

        try {
            const responses = await Promise.all(matricoleToEnable.map(matricola =>
                fetch(`${VITE_BACKEND_URL}/meterReader/enable/${matricola}`, { method: 'PATCH' }) // Richiesta PATCH per abilitare
            ));

            const errors = responses.filter(response => !response.ok);

            if (errors.length > 0) {
                alert('Errore durante l\'abilitazione di uno o più letturisti.');
            } else {
                // Aggiorna lo stato dei letturisti abilitati
                setLetturisti(prev =>
                    prev.map(letturista =>
                        matricoleToEnable.includes(letturista.matricola)
                            ? { ...letturista, isActive: true }
                            : letturista
                    )
                );
                alert('Letturisti abilitati con successo.');
                setSelectedLetturisti({}); // Reset della selezione
            }
        } catch (error) {
            console.error('Errore durante l\'abilitazione:', error);
        }
    };


    const handleDeleteSelected = async () => {
        const matricoleToDelete = Object.keys(selectedLetturisti).filter(matricola => selectedLetturisti[matricola]);

        if (matricoleToDelete.length === 0) {
            alert('Seleziona almeno un letturista da eliminare.');
            return;
        }

        try {
            const responses = await Promise.all(matricoleToDelete.map(matricola =>
                fetch(`${VITE_BACKEND_URL}/meterReader/${matricola}`, { method: 'DELETE' })
            ));

            const errors = responses.filter(response => !response.ok);

            if (errors.length > 0) {
                alert('Errore durante l\'eliminazione di uno o più letturisti.');
            } else {
                setLetturisti(prev => prev.filter(letturista => !matricoleToDelete.includes(letturista.matricola)));
                alert('Letturisti eliminati con successo.');
            }
        } catch (error) {
            console.error('Errore durante l\'eliminazione:', error);
        }
    };

    const handleDisableSelected = async () => {
        const matricoleToDisable = Object.keys(selectedLetturisti).filter(matricola => selectedLetturisti[matricola]);

        if (matricoleToDisable.length === 0) {
            alert('Seleziona almeno un letturista da disabilitare.');
            return;
        }

        try {
            const responses = await Promise.all(matricoleToDisable.map(matricola =>
                fetch(`${VITE_BACKEND_URL}/meterReader/disable/${matricola}`, { method: 'PATCH' }) // Richiesta PATCH per disabilitare
            ));

            const errors = responses.filter(response => !response.ok);

            if (errors.length > 0) {
                alert('Errore durante la disabilitazione di uno o più letturisti.');
            } else {
                setLetturisti(prev => prev.filter(letturista => !matricoleToDisable.includes(letturista.matricola)));
                alert('Letturisti disabilitati con successo.');
                setSelectedLetturisti({}); // Reset della selezione
            }
        } catch (error) {
            console.error('Errore durante la disabilitazione:', error);
        }
    };

    if (loading) return <div className="loading-spinner"></div>;
    if (error) return <div>Error: {error.message}</div>;

    const filteredLetturisti = letturisti.filter(letturista =>
        letturista.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filteredLetturisti);


    return (
        <div className="letturisti-container">
            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Cerca Operatore"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="button-group">
                <button className="button-enable" onClick={handleEnableSelected}>Abilita</button>
                <button className="button-disable" onClick={handleDisableSelected}>Disabilita</button> {/* Aggiunta della funzione */}
                <button className="button-delete" onClick={handleDeleteSelected}>Elimina</button>
            </div>
            <table className="letturisti-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Immagine</th>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Matricola</th>
                        <th>Data di Inserimento</th>
                        <th>Stato</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLetturisti.map(letturista => (
                        <tr key={letturista.matricola}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedLetturisti[letturista.matricola] || false}
                                    onChange={() => handleSelectSingle(letturista.matricola)}
                                />
                            </td>
                            <td>
                                <img
                                    src={letturista.image
                                        ? `data:${letturista.contentType};base64,${letturista.image}`
                                        : defaultPhoto}
                                    alt={`${letturista.name} ${letturista.surname}`}
                                    className="letturista-image"
                                />
                            </td>
                            <td>{letturista.name}</td>
                            <td>{letturista.surname}</td>
                            <td>{letturista.matricola}</td>
                            <td>{letturista.publishedAt ? new Date(letturista.publishedAt).toISOString().slice(0, 10) : 'Data non disponibile'}</td>
                            <td>
                                {/* Pallino verde o rosso a seconda di isActive */}
                                <span
                                    className={`status-dot ${letturista.isActive ? 'true' : 'false'}`}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleEditClick(letturista)}>Modifica</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditing && selectedLetturista && (
                <div className="edit-form">
                    <h2>Modifica Letturista</h2>
                    <label>
                        Nome:
                        <input
                            type="text"
                            value={selectedLetturista.name}
                            onChange={(e) => setSelectedLetturista({ ...selectedLetturista, name: e.target.value })}
                        />
                    </label>
                    <label>
                        Cognome:
                        <input
                            type="text"
                            value={selectedLetturista.surname}
                            onChange={(e) => setSelectedLetturista({ ...selectedLetturista, surname: e.target.value })}
                        />
                    </label>


                    <label>
                        Foto attuale:
                        <div>
                            <img
                                className="preview-image"
                                alt="Foto attuale"
                                src={
                                    selectedLetturista.image
                                        ? `data:${selectedLetturista.contentType || 'image/jpeg'};base64,${selectedLetturista.image}`
                                        : defaultPhoto
                                }
                            />
                        </div>
                    </label>

                    <label>
                        Nuova immagine:
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </label>
                    
                    {newImage && (
                        <>
                            <div>Anteprima nuova foto:</div>
                            <img src={newImage} alt="Anteprima" className="preview-image" />
                        </>
                    )}
                    <button onClick={handleSaveChanges}>Salva Cambiamenti</button>
                    <button onClick={() => setIsEditing(false)}>Annulla</button>
                </div>
            )}
        </div>
    );
};

export default Letturisti;
