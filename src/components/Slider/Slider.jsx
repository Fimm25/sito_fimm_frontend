import React, { useState, useEffect, useRef } from 'react';
import './Slider.scss';
import './player.css';
import iPad from '../../assets/images/iPad.svg';
import MacBook from '../../assets/images/MacBook.svg';
import Card from '../Card/Card';
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

const images = [
    { type: 'component', content: <Card imageSrc={iPad} altText="iPad" />  },
    { type: 'component', content: <Card imageSrc={MacBook} altText="Macbook" />  }
];

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const loaderRef = useRef(null);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                goToNext();
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [currentIndex, isPlaying]);

    useEffect(() => {
        const loader = loaderRef.current;
        if (loader) {
            const loadingBar = loader.querySelector('.loading-bar');
            if (isPlaying) {
                // Riavvia l'animazione
                loadingBar.style.animation = 'none';
                loadingBar.offsetHeight; // Trigger reflow
                loadingBar.style.animation = ''; // Reimposta l'animazione
            } else {
                // Pausa l'animazione
                loadingBar.style.animationPlayState = 'paused';
            }
        }
    }, [isPlaying]);

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    

    return (
        <div className="slider_solution">
            <div className="slider_solution__wrapper">
                {images[currentIndex].type === 'image' ? (
                    <img
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        className="slider_solution__image"
                    />
                ) : (
                    images[currentIndex].content
                )}
      
                <div className="container" ref={loaderRef}>
                    
                    <div className="loader">
                        <div className="loading-bar"></div>
                    </div>
                    <button className="player" onClick={togglePlayPause}>
                        {isPlaying ? <FaPause size={22} color='#f5f5f7'/> : <FaPlay size={22} color='#f5f5f7'/>}
                    </button>
                </div>
                
            </div>
  
        </div>
    );
};

export default Slider;
