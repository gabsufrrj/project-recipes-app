import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import RadioButtons from '../Components/RadioButtons';
import Footer from '../Components/Footer';
import FilterByCategories from '../Components/FilterByCategory';
import Recipes from '../Components/Recipes';

function FoodRecipes({ history }) {
  return (
    <div>
      <Header title="Foods" renderInput />
      <RadioButtons apiName="themealdb" history={ history } />
      <FilterByCategories apiName="themealdb" />
      <Recipes history={ history } />
      <h1>
        FoodRecipes
      </h1>
      <Footer />
    </div>
  );
}

export default FoodRecipes;

FoodRecipes.propTypes = {
  history: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};
