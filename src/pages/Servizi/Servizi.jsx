import './Servizi.scss';
import React, { useState } from 'react';
import Contatore from '../../assets/images/service-cardImg/fimm-copertina.png'
import ilsostitutore from '../../assets/images/imgPowerPoint/sostituzioneContatoriFimm.jpg';
import servizi_image from '../../assets/images/f.imm/servizi_main.png';
import callCenter from '../../assets/images/imgPowerPoint/call-center.jpg'
import Censimenti from '../../assets/images/imgPowerPoint/Censimenti.jpg'

const Servizi = () => {
  const [activeCard, setActiveCard] = useState("card1"); // Default aperto sulla prima card

  const handleCardClick = (cardId) => {
    if (activeCard !== cardId) {
      setActiveCard(cardId); // Cambia card solo se diversa da quella attuale
    }
  };

  const cardContents = {
    card1: {
      image: Contatore,
      title: 'Fotolettura Contatori',
      description:
        'Attraverso l’utilizzo della propria piattaforma GETWeb e GETWebMobile, gli operatori F.IMM sono in grado di certificare la lettura dei contatori fotografando il quadrante dello stesso. Le foto dei contatori sono associate in modo univoco e inequivocabile al contatore stesso, così come il dato di posizione geografica, acquisito automaticamente al momento della fotografia. Le foto dei contatori portano in sovraimpressione sempre la data, l’ora e il PDR o Codice Utente dell’utenza visitata. Ogni altra attività legata alla lettura (eventuali preavvisi, rilevazione di anomalie, segnalazioni varie) vengono rilevate e certificate contestualmente',
    },
    card2: {
      image: ilsostitutore,
      title: 'Sostituzione Contatori',
      description:
        'Con georeferenziazione e servizi accessori al contatore, organizzati in tempi rapidi e sulle specifiche necessità del commitente F.IMM è in grado di fornire il servizio di sostituzione misuratori, attraverso l’utilizzo di proprio personale adeguatamente formato e dotato di tutte le strumentazioni necessarie all’attività (esplosimetri, rilevatori di gas, misuratori di pressione, ecc.). Tutte le fasi di sostituzione sono certificate tramite la compilazione di check-list appositamente studiate ed implementate su dispositivi mobili da campo (tablet e smartphone) in dotazione agli operatori, fotografando ogni singola fase di avanzamento dell’attività.',
    },
    card3: {
      image: callCenter,
      title: 'Servizio Call Center',
      description:
      'Personale call center formato per attività di inbound e outbound al fine si supportare gli utenti della clientela, fissare appuntamenti e ricevere autoletture.',
    },
    card4: {
      image: Censimenti,
      title: 'Censimenti',
      description:
        'Verifica e censimento della rete dei contatori del commitente ed acquisizione dati specifici su piattaforma del cliente o su proprio software (interfacciabile con quello del cliente), il tutto supportato da report fotografico',
    },
  };

  return (
    <div className='servizi_body'>
      <section className="servizi">
        <div className="servizi_action">
          <h2 className="servizi_title">Da oltre 30 anni al servizio dei nostri clienti</h2>
          <span className="servizi_divisore"></span>
          <p className="servizi_description">
          F.IMM ha investito negli ultimi anni sulla creazione di un'organizzazione territoriale di operai dotati di mezzi ed esperienza, per rispondere celermente alle esigente
          dei propri clienti.
          </p>
          <p className="servizi_description">
          F.IMM progetta con i propri clienti i livelli di servizio da raggiungere e gli obiettivi, monitorando i risultati attraverso Software di propria produzione
          per la pianificazione - esecuzione- rendicontazione delle attività sul campo
          </p>
        </div>
        <div className="servizi_img">
          <img src={servizi_image} alt="Servizi" className='servizi_desiato' loading="lazy"/>
        </div>
      </section>

      <div className="servizi_divider">
        <h2>I nostri servizi</h2>
        <hr className="separator" />
      </div>

      <section className="servizi_card">
        <div className="card_container">
          <div className="card_details">
            {Object.keys(cardContents).map((cardId) => (
              <div key={cardId} className="details_hr">
                <div className="details_title">
                  <button
                    className="details_button"
                    onClick={() => handleCardClick(cardId)}
                  >
                    {cardContents[cardId].title}
                    <span className={`arrow ${activeCard === cardId ? 'up' : 'down'}`}>
                      ▼
                    </span>
                  </button>
                </div>
                {activeCard === cardId && (
                  <div className="details_description">
                    {cardContents[cardId].description}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="card_image">
            {activeCard && (
              <img
                alt="card_image"
                className="image"
                src={cardContents[activeCard].image}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servizi;
