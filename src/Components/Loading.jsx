import React from 'react';
import loadingImg from '../images/loading-food.gif';
import '../CSS/Loading.css';

function Loading() {
  return (
    <div className="loading">
      <img src={ loadingImg } alt="Loading" />
    </div>
  );
}

export default Loading;
