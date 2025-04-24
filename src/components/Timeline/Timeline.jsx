import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';

// Import delle immagini
import lettura from '../../assets/images/sitoVecchio/TFB.png';
import fattura from '../../assets/images/sitoVecchio/2.png'
import fotolett from '../../assets/images/sitoVecchio/3.png';
import polizie from '../../assets/images/sitoVecchio/4.png';
import postaOk from '../../assets/images/products/ritaglio-postaok.jpg';
import mobile from '../../assets/images/products/GETWebMobile_EveryDevice.jpg';
import get from '../../assets/images/Screenshoot/GetWebScreen/gw2.jpg';
import sostituzione from '../../assets/images/imgPowerPoint/sostituzioneContatoriFimm.jpg';


// Dati della timeline
const timelineData = [
  { year: "'80 - '90", title: "Lettura contatori", description: "Terminali portatili resistenti e robusti", image: lettura },
  { year: "'90", title: "Fatturazione immediata", description: "Stampanti a trasferimento termico", image: fattura },
  { year: "2000", title: "Fotolettura contatori", description: "Primi dispositivi con rilevamento d'immagine", image: fotolett },
  { year: "2001", title: "Polizie locali", description: "Terminali per rilevamento delle sanzioni", image: polizie },
  { year: "2008", title: "Recapito certificato", description: "Consegna documenti con data e ora certa", image: postaOk },
  { year: "2013", title: "App GETWeb mobile", description: "Apllicazione per rilevamento letture via web", image: mobile },
  { year: "2014", title: "GETWeb", description: "Gestionale per controllo letture e operatori in cloud", image: get },
  { year: "2021", title: "Sostituzione contatori con Smart Meters", description: "Campagne massive di sostituzione contatori ", image: sostituzione },
];

// Funzione per rendere il TimelineDot
const renderTimelineDot = (image, icon) => {
  if (image) {
    return (
      <img
        src={image}
        alt="Timeline"
        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
      />
    );
  }
  return icon || <TimelineDot />;
};

export default function CustomizedTimeline() {
  return (
    <Timeline position="alternate">
      {timelineData.map(({ year, title, description, image, icon }, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
              px: 2, // Padding laterale
            }}
            variant="body2"
            color="text.secondary"
          >
            {year}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector sx={{ height: 20 }} />
            <TimelineDot sx={{backgroundColor: '#f9f9f9'}}>
              {renderTimelineDot(image, icon)}
            </TimelineDot>
            <TimelineConnector sx={{ height: 20 }} />
          </TimelineSeparator>
          <TimelineContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              py: 2,
              px: 2,
            }}
          >
            <Typography variant="h6" component="span" sx={{fontFamily: 'Poppins', fontWeight: 'bold', fontSize: {
              xs: '0.8rem', // smartphone
              sm: '1.125rem', // tablet
              md: '1.25rem', // desktop
              },}}>
              {title}
            </Typography>
            <Typography sx={{fontFamily: 'Poppins', fontSize: {
              xs: '0.7rem', // smartphone
              sm: '1.rem', // tablet
              md: '1.rem', // desktop
              },}}>{description}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
