import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ExploreDrink() {
  return (
    <div>
      <Header title="Explore Drinks" renderInput={ false } />
      <h1>
        ExploreDrink
      </h1>
      <Footer />
    </div>
  );
}

export default ExploreDrink;
