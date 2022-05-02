import React from 'react';
import PropTypes from 'prop-types';
import RecipeInProgress from '../Components/RecipeInProgress';

function ProgressFoodRecipes({ match: { params: { id } } }) {
  return (
    <RecipeInProgress recipeId={ id } apiName="themealdb" />
  );
}

export default ProgressFoodRecipes;

ProgressFoodRecipes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
