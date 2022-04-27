import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ExploreFood() {
  return (
    <div>
      <Header title="Explore Foods" renderInput={ false } />
      <h1>
        ExploreFood
      </h1>
      <Footer />
    </div>
  );
}

export default ExploreFood;
