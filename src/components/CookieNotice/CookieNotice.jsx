import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CookieNotice.scss";

const STORAGE_KEY = "cookie_notice_ack_v1";

export default function CookieNotice({ bottomOffset = 16 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const ack = window.localStorage.getItem(STORAGE_KEY);
      if (!ack) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const handleOk = () => {
    try { window.localStorage.setItem(STORAGE_KEY, "true"); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="cookieNotice"
      role="region"
      aria-label="Avviso sui cookie tecnici"
      style={{ bottom: bottomOffset }}  
    >
      <p className="cookieNotice__text">
        Usiamo <strong>solo cookie tecnici</strong> per il corretto funzionamento del sito.
        Nessun cookie di profilazione o analitico.{" "}
        <Link to="/cookie-policy" className="cookieNotice__link">
          Leggi la Cookie Policy
        </Link>
        .
      </p>
      <button
        type="button"
        onClick={handleOk}
        aria-label="Chiudi avviso cookie"
        className="cookieNotice__button"
      >
        OK
      </button>
    </div>
  );
}
