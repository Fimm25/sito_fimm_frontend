import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import FixedBottomNavigation from "./FixedBottomNavigation";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton"; // Import del nuovo componente
import './App.scss';
import { useUser } from './context/UserContext';

// Import delle pagine
import Home from "./pages/Home/Home";
import Servizi from "./pages/Servizi/Servizi";
import Prodotti from "./pages/Prodotti/Prodotti";
import LavoraConNoi from "./pages/LavoraConNoi/LavoraConNoi";
import Contatti from "./pages/Contatti/Contatti";
import ChiSiamo from "./pages/ChiSiamo/ChiSiamo";
import LoginPage from './pages/LoginPage/LoginPage';
import JobDetail from "./components/JobDetail/JobDetail";
import EditJob from "./components/EditJob/EditJob";
import CreaOfferta from "./components/CreaOfferta/CreaOfferta";
import Investigator from "./pages/Investigator/Investigator";
import CaricaLetturista from "./pages/Letturisti/CaricaLetturista";
import Letturisti from "./pages/Letturisti/Letturisti";
import Manuntenzione from "./pages/Manutenzione/Manutenzione";
import Autolettura from "./pages/Autolettura/Autolettura";
import DatiContatto from "./pages/DatiContatto/DatiContatto";

function App() {
  const { user } = useUser();
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ChiSiamo" element={<ChiSiamo />} />
        <Route path="/Servizi" element={<Servizi />} />
        <Route path="/Prodotti" element={<Prodotti />} />
        <Route path="/LavoraConNoi" element={<LavoraConNoi />} />
        <Route path="/Autolettura" element={<Autolettura />} />
        <Route path="/DatiContatto" element={<DatiContatto />} />
        <Route path="/offers/:id" element={<JobDetail />} />
        <Route path="/EditJob/:id" element={user ? <EditJob /> : <Navigate to='/login' />} />
        <Route path="/Contatti" element={<Contatti />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to='/LavoraConNoi' />} />
        <Route path="/Investigator" element={<Investigator />} />
        <Route path="/Manuntenzione" element={<Manuntenzione />} />
        <Route path="/CreaOfferta" element={user ? <CreaOfferta /> : <Navigate to='/login' />} />
        <Route path="/carica-letturista" element={user ? <CaricaLetturista /> : <Navigate to='/login' />} />
        <Route path="/letturisti" element={user ? <Letturisti /> : <Navigate to='/login' />} />
      </Routes>
      <Footer />
      <ScrollToTopButton /> {/* Aggiungi qui il componente */}
      {isMobile && <FixedBottomNavigation />}
    </>
  );
}

export default App;
