import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function FoodRecipes({ history }) {
  return (
    <div>
      <Header title="Foods" renderInput apiName="themealdb" history={ history } />
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
