import React from 'react';
import './Card.scss';

const Card = ({ imageSrc, altText }) => {
  return (
    <div className="card-container">
      <h1 className="card-title">
        Una soluzione a portata di mano.
      </h1>
      <div>
        <img src={imageSrc} alt={altText} />
      </div>
    </div>
  );
};

export default Card;


