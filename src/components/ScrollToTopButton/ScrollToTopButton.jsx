import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ScrollToTopButton.scss"; // Stile separato

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation(); // Hook per identificare la pagina corrente

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Determina la classe dinamica del colore in base alla pagina
  const buttonClass =
    location.pathname === "/Prodotti" ? "scroll-to-top prodotti" : "scroll-to-top";

  return (
    isVisible && (
      <button className={buttonClass} onClick={scrollToTop}>
        ⬆
      </button>
    )
  );
};

export default ScrollToTopButton;
