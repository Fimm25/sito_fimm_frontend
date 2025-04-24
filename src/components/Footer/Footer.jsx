import './Footer.scss'; // Assicurati di importare il file SCSS
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube  } from 'react-icons/fa';
import { useLocation } from "react-router-dom";

export default () => {
  const location = useLocation();

  const footerTextClass = `footer__text${
    location.pathname === '/Prodotti' ? '--software' :
    ''
  }`;

  const footerClass = `footer${
    location.pathname === '/Prodotti' ? '--software' :
    ''
  }`;

    return (
        <footer className={footerClass}>
      <div className="footer__container">
        <div className={footerTextClass}>
          <p>DPO: Cristiano Pastorello</p>
          <p>F.IMM srl | Viale delle Industrie, 13/A | 45100 ROVIGO</p>
          <p>REA n. 90489 | CAPITALE SOCIALE € 484.000,00 INT. VERS. | Cod. Fisc. e Part. I.V.A. n. 00724860291</p>
          <p>© Copyright F.IMM 2023 - Tutti i diritti riservati F.IMM srl</p>
          <p>
  <a href="../../public/Codice Etico FIMM.pdf" target="_blank" rel="noopener noreferrer">
    Codice Etico FIMM
  </a> &nbsp;|&nbsp;
  <a href="../../public/SA8000.pdf" target="_blank" rel="noopener noreferrer">
    Politica della Responsabilità Sociale
  </a>
</p>
<p>
  <a href="../../public/Segnalazioni.pdf" target="_blank" rel="noopener noreferrer">
    Modalità di segnalazione relative alla Responsabilità Sociale
  </a> &nbsp;|&nbsp;
  <a href="../../public/moduloSA8000.pdf" target="_blank" rel="noopener noreferrer">
    Modulo Segnalazioni
  </a>
</p>

        </div>
        <div className="footer__social">
          <a href="https://www.facebook.com/fimmLetture/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://www.linkedin.com/company/f-imm-srl/mycompany/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="https://www.instagram.com/fimmletture/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com/channel/UCfWBe1IylKRdxEVnUQ674Fg" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};
