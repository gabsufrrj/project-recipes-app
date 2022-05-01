import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import RadioButtons from '../Components/RadioButtons';
import Footer from '../Components/Footer';
import FilterByCategories from '../Components/FilterByCategory';
import Recipes from '../Components/Recipes';

function DrinkRecipes({ history }) {
  return (
    <div>
      <Header title="Drinks" renderInput />
      <RadioButtons apiName="thecocktaildb" history={ history } />
      <FilterByCategories apiName="thecocktaildb" />
      <Recipes history={ history } />
      <h1>
        Drink Recipes
      </h1>
      <Footer />
    </div>
  );
}

export default DrinkRecipes;

DrinkRecipes.propTypes = {
  history: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};
