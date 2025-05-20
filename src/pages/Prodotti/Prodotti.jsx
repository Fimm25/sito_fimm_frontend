import React, { useState, useEffect } from 'react';
import easy_image from '../../assets/images/products/screen_easy4.svg';
import mobile_prodotti from '../../assets/images/f.imm/prodotti_mobile.svg';
import tablet_prodotti from '../../assets/images/f.imm/prodotti_tablet.svg';
import cross from '../../assets/images/f.imm/cross.png';
import card_image from '../../assets/images/f.imm/card_prodotti.png';
import './Prodotti.scss';
import solution_image from '../../assets/images/f.imm/solution_trio.svg';
import icon_image from '../../assets/images/f.imm/plus.png';
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { useAnimation } from 'framer-motion';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import { AiOutlineCluster } from 'react-icons/ai';
import { FiDatabase } from 'react-icons/fi';
import { MdOutlineSpeed } from 'react-icons/md';
import BabySlider from '../../components/BabySlider/BabySlider';

import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'; // componente dello spinner

/* import immagini iphone */
import iphone1 from '../../assets/images/Screenshoot/GetWebMobileScreen/gm1.png'
import iphone2 from '../../assets/images/Screenshoot/GetWebMobileScreen/gm2.png'
import iphone3 from '../../assets/images/Screenshoot/GetWebMobileScreen/gm3.png'
import iphone4 from '../../assets/images/Screenshoot/GetWebMobileScreen/gm4.png'
import iphone5 from '../../assets/images/Screenshoot/GetWebMobileScreen/gm5.png'
import iphone6 from '../../assets/images/Screenshoot/GetWebMobileScreen/gm6.png'
import iphone7 from '../../assets/images/Screenshoot/GetWebMobileScreen/gm7.png'



const Software = () => {
//immagini slider
  const iphoneImages = [iphone1, iphone2, iphone3, iphone4, iphone5, iphone6, iphone7];


  // Stato per tenere traccia della card aperta
  const [openedCard, setOpenedCard] = useState(null);
 
  // Funzione per aprire una card specifica
  const openCard = (cardIndex) => {
    setOpenedCard(cardIndex); // Imposta l'indice della card aperta
  };
 
  // Funzione per chiudere la card
  const closeCard = () => {
    setOpenedCard(null); // Nessuna card aperta
  };
 
  // Effetto per aggiungere o rimuovere la classe no-scroll al body quando una card è aperta
  useEffect(() => {
    if (openedCard !== null) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
 
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [openedCard]);
 
  const controls_vertical = useAnimation();
  const [ref_vertical, inView_vertical] = useInView({ threshold: 0.2 });
 
  const controls_vertical_2 = useAnimation();
  const [ref_vertical_2, inView_vertical_2] = useInView({ threshold: 0.2 });
 
    useEffect(() => {
      if (inView_vertical) {
        controls_vertical.start({ y: 0, opacity: 1 });
      } else {
        controls_vertical.start({ y: 50, opacity: 0 });
      }
    }, [controls_vertical, inView_vertical]);
 
    useEffect(() => {
      if (inView_vertical_2) {
        controls_vertical_2.start({ y: 0, opacity: 1 });
      } else {
        controls_vertical_2.start({ y: 50, opacity: 0 });
      }
    }, [controls_vertical_2, inView_vertical_2]);
 
  const controls = useAnimation();
  const controls_reverse = useAnimation();
  const controls_2 = useAnimation();
  const controls_3 = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [ref_2, inView_2] = useInView({ threshold: 0.2 });
  const [ref_3, inView_3] = useInView({ threshold: 0.2 });
  const [ref_4, inView_4] = useInView({ threshold: 0.2 });
 
  useEffect(() => {
        if (inView) {
        controls.start({ x: 0, opacity: 1 });
        } else {
        controls.start({ x: 150, opacity: 0 });
        }
  }, [controls, inView]);
 
  useEffect(() => {
        if (inView_2) {
        controls_reverse.start({ x: 0, opacity: 1 });
        } else {
        controls_reverse.start({ x: -150, opacity: 0 });
        }
  }, [controls_reverse, inView_2]);
 
  useEffect(() => {
        if (inView_3) {
        controls_3.start({ x: 0, opacity: 1 });
        } else {
        controls_3.start({ x: -150, opacity: 0 });
        }
  }, [controls_3, inView_3]);
 
  useEffect(() => {
        if (inView_4) {
        controls_2.start({ x: 0, opacity: 1 });
        } else {
        controls_2.start({ x: 150, opacity: 0 });
        }
  }, [controls_2, inView_4]);

  const [loading, setLoading] = useState(true); // Spinner del loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <SpinnerLoading />;
  } 

 
  return (
    <div className={`solution_page ${openedCard !== null ? 'no-scroll' : ''}`}>
      <div className='solution_container'>
          <h5>EASY4 + GETWeb</h5>
          <h2>Una gestione completa.</h2>
        <div className='solution_body'>
          <div className='solution-trioimg'>
            <img alt="Immagine Trio" src={solution_image} loading="lazy"/>
          </div>
          <div className='solution-detail'>
 
            <div >
              <div className='innerSquare'>
                 <AiOutlineCluster size={48} />
                  <p><span>Gestione centralizzata e integrata</span><br />Una piattaforma unica per il controllo e la gestione delle utenze, ottimizzando i processi operativi e garantendo un monitoraggio efficiente delle attività.</p>
              </div>
            </div>
 
           
 
            <motion.div
              ref={ref_vertical}
              initial={{ y: 50, opacity: 0 }}
              animate={controls_vertical}
              transition={{ duration: 0.5 }}
              className="animated-text"
            >
            <div>
              <FiDatabase size={48} />
              <p><span>Accesso ai dati in tempo reale</span><br />Disponibilità immediata di informazioni, statistiche e report dettagliati, per un supporto decisionale rapido e preciso.</p>
            </div>
            </motion.div>
            <motion.div
              ref={ref_vertical_2}
              initial={{ y: 50, opacity: 0 }}
              animate={controls_vertical_2}
              transition={{ duration: 0.5 }}
              className="animated-text"
            >
            <div>
              <MdOutlineSpeed size={48} />
              <p><span>Facilità d'uso e ottimizzazione delle risorse</span><br/>Interfaccia intuitiva e strumenti avanzati che semplificano le attività quotidiane, migliorando la produttività e ottimizzando i processi operativi.</p>
            </div>
            </motion.div>
          </div>
        </div>
      </div>
     
      <motion.div
        ref={ref}
        initial={{ y: 50, opacity: 0 }}
        animate={controls}
        transition={{ duration: 2 }}
       
      >
      <div className='first-software'>
        <h1 className='title_solution'>Easy 4</h1>
        <img className="sw-image" src={easy_image} alt="primo software" loading="lazy"/>
        <motion.div
          className="box"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
        <button className='sw-action' onClick={() => openCard(0)}>
          Scopri di <img src={icon_image} alt="primo software" loading="lazy" />
        </button>
        </motion.div>
      </div>
      </motion.div>
 
      <motion.div
        ref={ref_2}
        initial={{ y: 100, opacity: 0 }}
        animate={controls_reverse}
        transition={{ duration: 2 }}
      >
      <div className='second-software'>
        <h1 className='title_solution'>GETWeb Mobile</h1>
        <img className="sw-image" src={mobile_prodotti} alt="primo software" loading="lazy" />
        <motion.div
          className="box"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
        <button className='sw-action' onClick={() => openCard(1)}>
          Scopri di <img src={icon_image} alt="secondo software" loading="lazy" />
        </button>
        </motion.div>
      </div>
      </motion.div>
      <motion.div
        ref={ref_4}
        initial={{ y: 100, opacity: 0 }}
        animate={controls_2}
        transition={{ duration: 2 }}
      >
      <div className='third-software'>
        <h1 className='title_solution'>GETWeb</h1>
        <img className="sw-image" src={tablet_prodotti} alt="primo software" loading="lazy" />
         <motion.div
          className="box"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
        <button className='sw-action' onClick={() => openCard(2)}>
          Scopri di <img src={icon_image} alt="terzo software" loading="lazy" />
        </button>
        </motion.div>
      </div>
      </motion.div>
      {/* L'overlay semi-trasparente */}
      {openedCard !== null && <div className="card-overlay show" onClick={closeCard}></div>}
 
      {/* La card che si apre */}
      {openedCard === 0 && (
        <div className="card no-scrollbar">
          <button className="card-close" onClick={closeCard}><img src={cross} loading="lazy"/></button>
          <div className="card-content">
            <div>
              <h2>Easy4</h2>
              <p className='description'><span className='evidenziato'>Easy4</span> è il nostro <span className='evidenziato'>software gestionale</span> per l’informatizzazione del <span className='evidenziato'>Servizio Idrico Integrato e dei Servizi Energetici, gas ed energia elettrica.</span> La nostra azienda si distingue da decenni nel panorama nazionale ed internazionale per la sua capacità di proporre <span className='evidenziato'></span>soluzioni innovative <span className='evidenziato'>alle esigenze del mercato nel settore delle Utilities, </span> con un costante impegno a migliorare il contenuto tecnologico e l’efficienza dei propri prodotti. </p>
            </div>
            <div>
              <h2>📈 Vantaggi</h2>
              <ul className='vantaggi'>
                <li>✔️ Altamente personalizzabile.</li>
                <li>✔️ Allineato con le delibre dell'Autorità (ARERA)</li>
                <li>✔️ Fornisce completa visione della situazione dell'azienda.</li>
                <li>✔️ Multi-azienda e multi-servizio.</li>
                <li>✔️ Non richiede installazione, accessibile via browser.</li>
                <li>✔️ Supporta letture tradizionali e telelettura per gas e acqua.</li>
              </ul>
            </div>
            <div>
              < VideoPlayer/>
              <p></p>
            </div>      
            <div>
              <h2>Dettagli</h2>
              <p className='description'>Il nostro software è un prodotto completo, disponibile sia in modalità on-premises sia in cloud, pensato per offrire una soluzione stabile e altamente performante. L’interfaccia intuitiva consente una gestione semplice e fluida delle operazioni quotidiane, mentre al suo interno sono integrate procedure e strumenti di Business Intelligence configurabili in base alle esigenze specifiche di ogni cliente, per garantire una visione chiara e strategica dei dati aziendali.
            La piattaforma viene costantemente aggiornata per recepire tempestivamente le delibere delle autorità competenti e le normative nazionali, assicurando così la piena conformità legislativa. Grazie alla sua struttura modulare, il sistema include funzionalità evolute come lo sportello digitale per gli utenti, la gestione della qualità tecnica, il controllo delle code agli sportelli e il monitoraggio continuo delle performance.
            Completano l’offerta la gestione degli incassi e delle morosità, la bollettazione, nonché il controllo e la gestione del magazzino relativo al parco contatori. Ogni componente della piattaforma è completamente configurabile e personalizzabile, permettendo di adattarsi in modo preciso e flessibile alle esigenze operative di ogni realtà.</p>
           </div>
            <div className='item1'>
             
            </div>
          </div>
        </div>
      )}
 
      {openedCard === 1 && (
        <div className="card">
          <button className="card-close" onClick={closeCard}><img src={cross} loading="lazy"/></button>
          <div className="card-content">
            <div>
              <h2>GETWebMobile: Gestione Avanzata Utenze</h2>
              <p className='description'>L’app <span className='evidenziato'>GETWebMobile</span> è una soluzione <span className='evidenziato'>avanzata</span> per <span className='evidenziato'>smartphone</span> e <span className='evidenziato'></span>tablet che consente la gestione di <span className='evidenziato'>fotolettura</span>, <span className='evidenziato'>censimento utenze</span> e <span className='evidenziato'>sostituzione</span> misuratori nei settori <span className='evidenziato_blu'>acqua</span>, <span className='evidenziato_giallo'>gas</span> ed <span className='evidenziato_giallo'>energia elettrica</span>.Sfrutta le funzionalità avanzate dei dispositivi mobili (fotocamere ad alta risoluzione, GPS, controllo vocale) per offrire prestazioni elevate a basso costo. Compatibile con <span className='evidenziato'>iOS ed Android</span>, funziona anche <span className='evidenziato'>offline</span> e si installa facilmente da remoto, con <span className='evidenziato'>aggiornamenti automatici</span>.</p>
            </div>
            <div>
            <h2>📈 Vantaggi</h2>
              <ul className='vantaggi'>
                <li>✔️ Intuitivo e semplice da usare.</li>
                <li>✔️ Utilizzabile anche offline.</li>
                <li>✔️ Integra strumenti cartografici (es. GoogleMaps) con funzioni interattive.</li>
                <li>✔️ Permette di effettuare fotoletture.</li>
                <li>✔️ Consente la lettura dei contatori Smart.</li>
                <li>✔️ Supporta letture tradizionali e telelettura per gas e acqua.</li>
              </ul>

            </div>
            <div>
               <BabySlider images={iphoneImages}/>
            </div>       
            <div>
              <h2>Dettagli</h2>
              <p className='description'>GetWebMobile è l’applicazione progettata per affiancare gli operatori sul campo con uno strumento semplice, intuitivo e altamente funzionale. L’app può essere utilizzata anche in assenza di connessione Internet: in modalità offline, tutte le attività vengono registrate e sincronizzate automaticamente con il sistema gestionale non appena la connessione viene ripristinata.

              Grazie a questa interconnessione, l’azienda mantiene sempre il pieno controllo in tempo reale delle attività svolte sul territorio. L’applicazione può essere interrogata da remoto in qualsiasi momento per recuperare dati aggiornati e consente inoltre all’azienda di inviare comunicazioni immediate agli operatori per fornire supporto operativo.

              Completamente configurabile in base alle esigenze aziendali, GetWebMobile integra workflow predefiniti che semplificano le operazioni dell’utente e strumenti cartografici che offrono una visione chiara e completa delle attività da svolgere. Inoltre, l’app supporta funzionalità avanzate come la fotolettura e l’interazione diretta con contatori smart, rendendo le operazioni sul campo ancora più rapide ed efficienti.</p>

            </div>
            <div className='item1'>
             
            </div>
          </div>
        </div>
      )}
 
      {openedCard === 2 && (
        <div className="card">
          <button className="card-close" onClick={closeCard}><img src={cross} loading="lazy"/></button>
          <div className="card-content">
            <div className='text_card'>
              <h2>GETWeb</h2>
              <p className='description'>GETWeb è una piattaforma software sviluppata da F.IMM per la gestione integrata delle attività di back-office nei servizi di lettura contatori, censimento e sostituzione misuratori. Offre comunicazione in tempo reale con dispositivi mobili tramite l’app GETWebMobile, formando un sistema completo di Work Force Management (WFM) per le Utilities.</p>
            </div>
            <div>
            <h2>📈 Vantaggi</h2>
              <ul className='vantaggi'>
                <li>✔️ Multi-utente, multi-commessa e multi-servizio.</li>
                <li>✔️ Non richiede installazione, accessibile via browser.</li>
                <li>✔️ Integra strumenti cartografici (es. GoogleMaps) con funzioni interattive.</li>
                <li>✔️ Fornisce grafici, report, e avanzamento lavori in tempo reale.</li>
                <li>✔️ Esporta dati e report verso software di office automation.</li>
                <li>✔️ Supporta letture tradizionali e telelettura per gas e acqua.</li>
              </ul>
            </div>
            <div>
              <img src={card_image} alt='Card' className='card_detail' loading="lazy"/>
            </div>       
            <div>
              <h2>Dettagli</h2>
              <p className='description'>Il software è progettato per garantire l’accesso simultaneo e concorrente da parte di più operatori, permettendo di gestire in modo efficiente 
              tutte le attività connesse al controllo operativo sul territorio. Consente di importare con facilità le letture da lavorare, organizzare e distribuire i carichi di lavoro 
              agli operatori in campo e gestire in maniera strutturata la forza lavoro impegnata nelle attività esterne. Ogni fase del processo, dalla pianificazione al monitoraggio, 
              è supportata da funzionalità che agevolano la validazione degli esiti e assicurano un controllo puntuale e centralizzato di tutte le operazioni svolte sul territorio.</p>

            </div>
            <div className='item1'>
             
            </div>
          </div>
        </div>
      )}
 
    </div>
  );
};
 
export default Software;