import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { motion } from 'framer-motion';
import './Home.scss';
import Component1 from '../../assets/images/f.imm/Component1.svg';
import Component2 from '../../assets/images/f.imm/Component2.svg';
import Component3 from '../../assets/images/f.imm/Component3.svg';
import c2a from '../../assets/images/f.imm/callToActionG.svg';
import lettura_2 from '../../assets/images/service-cardImg/Group30.jpg';
import Brand from '../../components/Brand/Brand';
import Statistics from '../../components/Statistics/Statistics';
import robot2 from '../../assets/images/Group32.png'
import { useInView } from "react-intersection-observer";
import { useAnimation } from 'framer-motion';
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'; // componente dello spinner


// Immagini e testo per il tablet slideshow
const tabletData = [
  { image: Component1, text: 'La F.IMM arriva e risolve dove gli altri improvvisano.' },
  { image: Component3, text: `Un'Azienda Globale: Innovazione e Soluzioni Senza Confini` },
];



export default () => {
const controls = useAnimation();
const [ref, inView] = useInView({ threshold: 0.2 });

const controls_2 = useAnimation();
const [ref_2, inView_2] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({ y: 0, opacity: 1 });
    } else {
      controls.start({ y: 50, opacity: 0 });
    }
  }, [controls, inView]);

  useEffect(() => {
    if (inView_2) {
      controls_2.start({ y: 0, opacity: 1 });
    } else {
      controls_2.start({ y: 50, opacity: 0 });
    }
  }, [controls_2, inView_2]);


  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % tabletData.length);
    }, 4000); // Cambia ogni 4 secondi

    return () => clearInterval(interval); // Cleanup dell'intervallo
  }, []);

  const handleLockClick = () => {
    navigate('/Investigator');
  };

  const handleAutoletturaClick = () => {
    navigate('/Autolettura');
  };

  const handleDatiClick = () => {
    navigate('/DatiContatto');
  };

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
    <>
    <section>
      <section className="lineSection">
        <div className="lineSection__container">
          <div className="lineSection__text">
            <p>
              Vuoi verificare se il letturista è autorizzato?{" "}
              <a href="">Utilizza il nuovo sistema di controllo</a>
            </p>
          </div>
          <div className="lineSection__btn">
            <motion.div
              className="box"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <button
                className="lineSection__button"
                onClick={handleLockClick}
              >
                Clicca qui
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="first_section">
  <div className="first_section__header">
    <p className="first_section__h2">Dal 1984</p>
    <p className="first_section__h1">{tabletData[currentSlide].text}</p>
  </div>
</section>
</section>

      {/* Slideshow con immagini tablet e testo */}
      <section className="tablet_slideshow">
        <div className="tablet_slideshow__content">
          <div className="tablet_slideshow__image">
            <img
              src={tabletData[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
            />
          </div>
        </div>
      </section>
      <h1>I nostri clienti</h1>
        <div>
          <Brand />
        </div>

      <section className="content-section">
        <div className="content-wrapper">
          <div className="image-container">
            <motion.div
              ref={ref}
              initial={{ y: 50, opacity: 0 }}
              animate={controls}
              transition={{ duration: 0.5 }}
              className="animated-text"
            >
            <img className="image" src={lettura_2} alt="lettura" />
            </motion.div>
          </div>
          <div className="text-container">
            <span className="service-tag">Servizi</span>
            <h2 className="service-title">Un servizio per ogni esigenza</h2>
            <motion.div
              ref={ref}
              initial={{ y: 30, opacity: 0 }}
              animate={controls}
              transition={{ duration: 1 }}
              className="animated-text"
            >
              <p className="service-description">
              I nostri team specializzati sono pronti a garantirvi i migliori risultati.
              </p>
              <ul>
                <li>Leader del mercato </li>
                <li>Qualità e affidabilità</li>
                <li>Generazione di business innovativo e redditizio per il cliente</li>
                
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="statistics-section">
        <div className="statistics-background">
          <Statistics />
        </div>
      </section>
      <section>
        <div>
          <p>
            
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="content-wrapper">
          <motion.div
              ref={ref_2}
              initial={{ y: 50, opacity: 0 }}
              animate={controls_2}
              transition={{ duration: 0.5 }}
            >
          <div className="text-container">
            <span className="service-tag">Software</span>
            <h2 className="service-title">Un sistema di gestione all'avanguardia</h2>
            <p className="service-description">
            Siamo leader nell’innovazione tecnologica, supportando la gestione aziendale con soluzioni software all’avanguardia. 
            I nostri sistemi combinano potenza, versatilità e un’esperienza utente senza pari per garantire efficienza e precisione in ogni settore. Dal Servizio Idrico Integrato alle reti di distribuzione del Gas, offriamo strumenti personalizzabili per semplificare le operazioni e potenziare le performance aziendali, rendendoci un punto di riferimento sia a livello nazionale che internazionale.
            </p>
          </div>
          </motion.div>

          <div className="image-container">
            <motion.div
              ref={ref_2}
              initial={{ y: 50, opacity: 0 }}
              animate={controls_2}
              transition={{ duration: 0.5 }}
              className="animated-text"
            >
            <img className="imageSecond" src={robot2} alt="lettura" />
            </motion.div>
          </div>
        </div>     
      </section>
      <section>


  <div className='secondSection__buttons'>
    <motion.div
      className="box"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
      <Link to={'/Prodotti'}>
        <button className='secondSection__btn1'>Prodotti</button>
      </Link>
    </motion.div>
    <motion.div
      className="box"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link to={'/Servizi'}>
        <button className='secondSection__btn2'>Servizi</button>
      </Link>
    </motion.div>
  </div>
      </section>
      
      {/* 
    <section className='thirdSection'>
      <div className='box-1'>
        <img src={c2a}/>
      </div>
      <div className='box-2'>
        <p className='title'>Vuoi diventare <span className='gradient-text-1'>padrone</span> dei tuoi <span className='gradient-text-2'>consumi</span></p>
        <ul className='section_list'>
          <li>
            + precisione
          </li>
          <li>
            + velocità
          </li>
          <li>
            - errori
          </li>
        </ul>
        <div className='button_group'>
        <motion.div
      className="box"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
        <button className='thirdSection__btn2' onClick={handleDatiClick}>Dati di Contatto</button>
    </motion.div>

    <motion.div
      className="box"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
    <button className='thirdSection__btn1' onClick={handleAutoletturaClick}>Autolettura</button>
    </motion.div>

        </div>
      </div>
    </section>
*/}
    </>
  );
};
