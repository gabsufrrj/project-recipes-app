import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import RadioButtons from '../Components/RadioButtons';
import Footer from '../Components/Footer';

function FoodRecipes({ history }) {
  return (
    <div>
      <Header title="Foods" renderInput />
      <RadioButtons apiName="themealdb" history={ history } />
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
