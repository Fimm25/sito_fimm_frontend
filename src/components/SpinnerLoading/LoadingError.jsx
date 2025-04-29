import React from 'react';
import './LoadingError.scss';


const LoadingError = ({message}) => {
  return (
    <div className="loadingError-container">
    <h2>Opss! Qualcosa è andato storto</h2>
    <p>{message}</p>
    </div>
  );
};

export default LoadingError;