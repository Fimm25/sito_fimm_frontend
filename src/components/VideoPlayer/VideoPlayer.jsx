import React, { useState } from 'react';
import './VideoPlayer.scss';
import thumbnailImage from '../../assets/images/products/screenEasy4.jpg'; // Sostituisci con il percorso della tua immagine
import { FaPlay } from "react-icons/fa";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <div className="video-player">
      {!isPlaying ? (
        <div className="video-thumbnail" onClick={handlePlayVideo}>
          <img src={thumbnailImage} alt="Video Easy4" />
          <div className="video-thumbnail__overlay">
            <button className="video-thumbnail__play-button"><FaPlay /></button>
          </div>
        </div>
      ) : (
        <iframe
          width="100%"
          height="500px"
          src="https://www.youtube.com/embed/0eX2L6fjfHs?autoplay=1"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default VideoPlayer;
