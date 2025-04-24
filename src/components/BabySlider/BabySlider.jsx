import React from 'react';
import './BabySlider.scss';

const BabySlider = ({ images }) => {
  return (
    <div className="baby-slider">
      <div className="slider-wrapper">
        {images.map((image, index) => (
          <div className="slider-item" key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BabySlider;
