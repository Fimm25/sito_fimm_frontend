import { useEffect, useState } from "react"; // Aggiungi useEffect
import "./ChiSiamo.scss";
import sede_azienda from "../../assets/images/f.imm/sede_fimm.jpg";
import videoReal from "../../assets/videos/videoRealTagliato.mp4" // video
import fotoReal from "../../assets/images/cover-img/coverVideoTagliato.png" // cover video
import fotoReal2 from "../../assets/images/cover-img/cover_2.png"  // cover 2 video
import presentazione from "../../assets/images/f.imm/presentazione.mp4";
import { IoMdAdd } from "react-icons/io";
import CustomizedTimeline from "../../components/Timeline/Timeline";
import sa8000 from "../../assets/images/iso/Fimm_SA-8000.png";
import iso27001 from "../../assets/images/iso/Fimm_ISO-27001.png";
import iso9001 from "../../assets/images/iso/Fimm_ISO-9001.png";
import iso14001 from "../../assets/images/iso/Fimm_ISO-14001.png";
import iso45001 from "../../assets/images/iso/Fimm_ISO-45001.png";
import parita from "../../assets/images/iso/Fimm-Parita.png";
import soa from "../../assets/images/iso/Fimm-Soa.png";
import { useScroll } from "../../components/Scroll/ScrollContext"; // Importa il contesto

import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'; // componente dello spinner


const ChiSiamo = () => {
  const { scrollTo, setScrollTo } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTo) {
        const section = document.getElementById(scrollTo);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
        setScrollTo(null); // Resetta lo stato dopo lo scroll
      }
    };
  
    handleScroll();
  }, [scrollTo, setScrollTo]);


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
      <section className="section-wrapper first-section">
        <div className="content reverse-layout">
          <div className="text">
            <span className="highlight">Il punto di partenza</span>
            <h2>
              <span className="highlight">Gruppo Dondi:</span> la storia di una
              grande azienda
            </h2>
            <p>
              Fondato nel 1960, il Gruppo Dondi è un insieme di aziende nel settore dell'acqua, del gas, dell'energia e delle infrastrutture, con diversi progetti realizzati e gestiti in Europa, Africa e Sud America.
              Le aziende del gruppo possono agire come General Contractor (progettazione, costruzione, O&M), proponenti di PPP, gestori di servizi pubblici e servizi in genere.
            </p>
          </div>
          <div className="image-container">
          <video
            src={videoReal}
            loop
            muted
            className="video-container"
            preload="none"
            poster={fotoReal}  // fermo immagine per aiutare il caricamento nel mentre
            autoPlay
          >
            Il tuo browser non supporta il tag video.
          </video>

          </div>
        </div>
      </section>
      <div className="divider">
        <h2>La nostra storia</h2>
        <hr className="separator" />
      </div>
      <section className="section-wrapper">
        <div className="content reverse-layout">
          <div className="image-container">
            <video
            src={presentazione}
            autoPlay
            loop
            muted
            className="image_presentazione"
            preload="none"
            poster={fotoReal2}  // fermo immagine per aiutare il caricamento nel mentre
          >Il tuo browser non supporta il tag video.</video>
          </div>
          <div className="text">
            <span className="highlight">Come nasce F.IMM</span>
            <p>
              Con il suo nome originario, "F.IMM Fatturazione
              Immediata", nasce nel 1980 in Italia da un idea del fondatore del Gruppo,
              il Geometra Gianni Dondi, al fine di sviluppare soluzioni per ottimizzare 
              la gestione di un azienda del gas appartenente al Gruppo stesso.
              <br/>
              Il successo e gli ottimi risultati conseguiti da questa prima esperienza, 
              hanno spinto l'imprenditore ad investire in un progetto rivolto verso il mercato esterno.
            </p>
          </div>
        </div>
        <div className="plus">
          <IoMdAdd style={{ color: "#FF8801" }} />
        </div>
        <div className="content normal-layout">
          <div className="image-container">
            <img src={sede_azienda} alt="" />
          </div>
          <div className="text">
            <span className="highlight">L'evoluzione di F.IMM</span>
            <p>
              Sfruttando le competenze all'interno del Gruppo al quale appartiene, 
              F.IMM si è dunque specializzata negli anni nel creare prodotti innovativi
              (Hardware e software) e servizi in outsourcing, rispondendo alle esigenze delle Aziende pubbliche e private,
               che gestiscono acqua, gas ed energia elettrica.
            </p>
          </div>
        </div>
      </section>

      <div className="divider">
        <h2>F.IMM negli anni</h2>
        <hr />
      </div>

      <section>
        <div className="timeline">
          <CustomizedTimeline />
        </div>
      </section>

      <section className="certified-section" id="certificazioni">
        <div className="divider">
          <h2>Un'azienda certificata</h2>
          <hr />
        </div>

        <div className="grid-container">
          {[
            {
              title: "SA 8000",
              description:
                  "Lo standard accreditato riconosciuto a livello internazionale che risponde alle esigenze delle organizzazioni che vogliono distinguersi per il loro impegno nello sviluppo sostenibile e in particolare per le tematiche sociali.",
              pdf: "/certification/SA8000.pdf",
              logo: sa8000,
            },
            {
              title: "ISO 9001",
              description:
                  "Definisce i requisiti minimi che il Sistema di Gestione per la Qualità di un'organizzazione deve dimostrare di soddisfare per garantire il livello di qualità di prodotto e servizio.",
              pdf: "/certification/ISO9001.pdf",
              logo: iso9001,
            },
            {
              title: "ISO 45001",
              description:
                  "Lo standard internazionale per la salute e sicurezza sul lavoro, progettato per proteggere dipendenti e visitatori da incidenti e malattie legate al lavoro.",
              pdf: "/certification/ISO45001.pdf",
              logo: iso45001,
            },
            {
              title: "ISO 14001",
              description:
                  "Identifica una serie di norme tecniche relative alla gestione ambientale delle organizzazioni.",
              pdf: "/certification/ISO14001.pdf",
              logo: iso14001,
            },
            {
              title: "ISO 27001",
              description:
                  "Attesta la conformità e l'efficacia di un sistema di gestione per la sicurezza delle informazioni, garantendo la protezione di dati e informazioni.",
              pdf: "/certification/ISO27001.pdf",
              logo: iso27001,
            },
            {
              title: "UNI/PdR 125:2022",
              description:
                  "Certificazione del sistema di gestione per la parità di genere, finalizzata a promuovere equità, inclusione e pari opportunità all'interno dell'organizzazione.",
              pdf: "/certification/UNI-PDR-125-2022.pdf",
              logo: parita,
            },
            {
              title: "SOA OG6",
              description:
                  "Attestazione di qualificazione per l'esecuzione di lavori pubblici nella categoria OG6, relativa ad acquedotti, gasdotti, oleodotti, opere di irrigazione e di evacuazione.",
              pdf: "/certification/SOA-OG6.pdf",
              logo: soa,
            },
          ].map((item, index) => (
              <div className="grid-item" key={index}>
                <a
                    href={item.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certification-logo-link"
                    title={`Apri certificazione ${item.title}`}
                >
                  <img
                      src={item.logo}
                      alt={`Certificazione ${item.title}`}
                      className="certification-logo"
                  />
                </a>

                <div className="text-content">
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </div>
              </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ChiSiamo;