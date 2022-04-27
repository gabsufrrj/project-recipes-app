import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ExploreFoodByIngredients() {
  return (
    <div>
      <Header title="Explore Ingredients" renderInput={ false } />
      <h1>
        ExploreFoodByInredients
      </h1>
      <Footer />
    </div>
  );
}

export default ExploreFoodByIngredients;
