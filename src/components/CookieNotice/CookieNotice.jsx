import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "cookie_notice_ack_v1";

/**
 * Banner informativo per soli cookie tecnici.
 * Non imposta cookie; salva solo un flag in localStorage.
 * bottomOffset: spazio dal fondo per evitare sovrapposizioni (es. bottom nav).
 */
export default function CookieNotice({ bottomOffset = 16 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const ack = window.localStorage.getItem(STORAGE_KEY);
      if (!ack) setVisible(true);
    } catch {
      // Se localStorage non è disponibile, mostriamo comunque il banner (si chiuderà solo per la sessione)
      setVisible(true);
    }
  }, []);

  const handleOk = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Avviso sui cookie tecnici"
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: bottomOffset,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        borderRadius: 8,
        boxShadow: "0 8px 24px rgba(0,0,0,.15)",
        background: "#fff",
        border: "1px solid rgba(0,0,0,.08)",
        maxWidth: 960,
        margin: "0 auto",
      }}
    >
      <p style={{ margin: 0, lineHeight: 1.4, fontSize: 14, flex: 1 }}>
        Usiamo <strong>solo cookie tecnici</strong> per il corretto funzionamento del sito.
        Nessun cookie di profilazione o analitico.{" "}
        <Link to="/cookie-policy" style={{ textDecoration: "underline" }}>
          Leggi la Cookie Policy
        </Link>
        .
      </p>
      <button
        type="button"
        onClick={handleOk}
        aria-label="Chiudi avviso cookie"
        style={{
          appearance: "none",
          border: "1px solid rgba(0,0,0,.2)",
          background: "transparent",
          padding: "8px 12px",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        OK
      </button>
    </div>
  );
}
