import React from 'react';
import PropTypes from 'prop-types';
import RecipeInProgress from '../Components/RecipeInProgress';

function ProgressDrinkRecipes({ match: { params: { id } } }) {
  return (
    <RecipeInProgress id={ id } apiName="thecocktaildb" />
  );
}

export default ProgressDrinkRecipes;

ProgressDrinkRecipes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
