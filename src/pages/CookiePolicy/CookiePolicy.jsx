import React from "react";

export default function CookiePolicy() {
  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 16px" }}>
      <h1>Cookie Policy</h1>
      <p><em>Ultimo aggiornamento: 25 settembre 2025</em></p>

      <h2>Cosa sono i cookie</h2>
      <p>
        I cookie sono piccoli file di testo che un sito invia al dispositivo dell’utente
        per consentire il corretto funzionamento dei servizi.
      </p>

      <h2>Tipologie di cookie utilizzati</h2>
      <ul>
        <li>
          <strong>Cookie tecnici/necessari</strong>: permettono il funzionamento del sito
          (es. gestione sessione, sicurezza, preferenze basilari).
          <u> Non richiedono il consenso dell’utente.</u>
        </li>
        <li>
          <strong>Cookie non utilizzati</strong>: questo sito <u>non</u> utilizza
          cookie di profilazione né cookie analitici/di terze parti.
        </li>
      </ul>

      <h2>Durata dei cookie</h2>
      <p>
        I cookie tecnici possono essere di sessione (si cancellano alla chiusura del browser)
        o persistenti (durano più a lungo per ricordare impostazioni essenziali).
      </p>

      <h2>Gestione dei cookie dal browser</h2>
      <p>
        L’utente può gestire o eliminare i cookie tramite le impostazioni del proprio browser.
      </p>

      <h2>Titolare del trattamento</h2>
      <p>
        [Nominativo/Ragione sociale], [indirizzo], [email di contatto].
      </p>
    </div>
  );
}
