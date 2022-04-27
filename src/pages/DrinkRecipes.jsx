import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function DrinkRecipes() {
  return (
    <div>
      <Header title="Drinks" renderInput />
      <h1>
        Drink Recipes
      </h1>
      <Footer />
    </div>
  );
}

export default DrinkRecipes;
