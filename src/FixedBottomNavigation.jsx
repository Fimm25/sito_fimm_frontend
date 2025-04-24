import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import './App.scss';

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();  // Hook per navigare tra le pagine

  // Funzione per navigare quando una voce viene cliccata
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box >
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={5}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Prodotti"
            icon={<HomeIcon />}
            onClick={() => handleNavigation('/Prodotti')}  // Naviga alla Home
            sx={{
              fontFamily: 'Maven Pro',  // Applica il font Roboto
              fontWeight: 600,
              fontSize: 16,
              color: 'black',
            }}
          />
          <BottomNavigationAction
            label="Servizi"
            icon={<TipsAndUpdatesOutlinedIcon />}
            onClick={() => handleNavigation('/Servizi')}  // Naviga ai Preferiti
            sx={{
              fontFamily: 'Maven Pro, sans-serif',  // Applica il font Roboto
              fontWeight: 600,
              fontSize: 16,
              color: 'black',
            }}
          />
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            onClick={() => handleNavigation('/')}  // Naviga alla Home
            sx={{
              fontFamily: 'Maven Pro',  // Applica il font Roboto
              fontWeight: 600,
              fontSize: 16,
              color: 'black',
            }}
          />
          <BottomNavigationAction
            label="Lettura Sicura"
            icon={<LocalPoliceOutlinedIcon />}
            onClick={() => handleNavigation('/Investigator')}  // Naviga all'Archivio
            sx={{
              fontFamily: 'Maven Pro, sans-serif',  // Applica il font Roboto
              fontWeight: 600,
              fontSize: 5,
              color: 'black',
            }}
          />
          <BottomNavigationAction
            label="Chi Siamo"
            icon={<PersonOutlineOutlinedIcon />}
            onClick={() => handleNavigation('/Chisiamo')}  // Naviga all'Archivio
            sx={{
              fontFamily: 'Maven Pro, sans-serif',  // Applica il font Roboto
              fontWeight: 600,
              fontSize: 5,
              color: 'black',
            }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
