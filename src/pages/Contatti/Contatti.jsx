import React, { useState } from 'react';
import './Contatti.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { IoIosMail } from 'react-icons/io';
import { FaPhoneAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const openInGoogleMaps = (lat, lng) => {
  const url = `https://www.google.com/maps/place/${lat},${lng}`;
  window.open(url, '_blank');
};

// Informazioni di contatto per ciascun paese
const contacts = {
  italy: {
    email: 'fimm@fimm.com',
    phone: '0425-475811',
    address: 'Viale delle Industrie 13/A – 45100 Rovigo',
    mapCoords: [45.04705471593058, 11.794782841134259],
  },
  brazil: {
    email: 'fimmbra@fimm.com.br',
    phone: '55-85-3261-8135',
    address: 'Rua Osvaldo Cruz, 1920 – Aldeota – CEP: 60125-150, Fortaleza – Ceará',
    mapCoords: [-2.357409595748631, -38.44834501366822],
  },
  bolivia: {
    email: 'info@fimm.com.bo',
    phone: '00591-3-375154',
    address: 'Calle Quijarro, 81 – Edificio Gloria, Planta Baja, Santa Cruz de la Sierra',
    mapCoords: [-17.772884703422992, -63.178786897010255],
  },
  argentina: {
    email: 'fimm_co@yahoo.com',
    phone: '00571-6232013',
    address: 'A. Moreau de Justo, 846 3er Piso OF.:4 Dock 6, Puerto Madero',
    mapCoords: [-34.607084674094644, -58.366492813495356],
  },
  colombia: {
    email: 'info@fimm.co',
    phone: '+57 1 1234567',
    address: 'Calle 93 B No. 16-08 Oficina 410 Barrio Chicò, Bogotà',
    mapCoords: [4.679437794200256, -74.0519382711651],
  },
  messico: {
    email: 'fimm@fimm.com',
    phone: '00571-6232013',
    address: 'Camino Real, 94290 Boca del Río, Veracruz, Messico',
    mapCoords: [19.105683, -96.106298],
  },
  egitto: {
    email: 'hodatawfik.dondi@fimm.com',
    phone: '002024152819',
    address: '17 Amin Zaki, Al Golf, Nasr City, Cairo Governorate 4451403, Egitto',
    mapCoords: [30.08260368912501, 31.323748384537065],
  }
};

const countries = {
  italy: 'Italia',
  brazil: 'Brasile',
  bolivia: 'Bolivia',
  argentina: 'Argentina',
  colombia: 'Colombia',
  messico: 'Messico',
  egitto: 'Egitto'
};

const Contatti = () => {
  const [selectedCountry, setSelectedCountry] = useState('italy');

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const selectedContact = contacts[selectedCountry];

  return (
    <div>
      <MapContainer center={[0, -30]} zoom={2} scrollWheelZoom={true} className="leaflet-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Object.entries(contacts).map(([key, contact]) => (
          <Marker key={key} position={contact.mapCoords}>
            <Popup>
              <strong>F.IMM S.r.l {countries[key]}</strong><br />
              <strong>Descrizione:</strong> {contact.address}<br />
              <strong>Telefono:</strong> {contact.phone}<br />
              <strong>Email:</strong> {contact.email}<br />
              <motion.div
                className="box"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <button className="map-button" onClick={() => openInGoogleMaps(...contact.mapCoords)}>
                  Apri in Google Maps
                </button>
              </motion.div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="contact-form-container">
        <h2>Contattaci</h2>
        <div className="contact-form">
          <label htmlFor="country">Seleziona il paese:</label>
          <select id="country" value={selectedCountry} onChange={handleCountryChange}>
            {Object.entries(countries).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>

          {/* Mostra le informazioni di contatto */}
          <div className="contact-info">
            <div className="contact-item">
              <IoIosMail className="react-icon" />
              <a href={`mailto:${selectedContact.email}`}>{selectedContact.email}</a>
            </div>
            <div className="contact-item">
              <FaPhoneAlt className="react-icon" />
              <a href={`tel:${selectedContact.phone}`}>{selectedContact.phone}</a>
            </div>
            <div className="contact-item">
              <button
                className="map-button"
                onClick={() => openInGoogleMaps(...selectedContact.mapCoords)}
              >
                {selectedContact.address}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contatti;
