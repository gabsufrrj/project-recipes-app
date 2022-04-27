import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

function FoodRecipes({ history }) {
  return (
    <div>
      <Header history={ history } title="Foods" />
      <h1>
        FoodRecipes
      </h1>
    </div>
  );
}

FoodRecipes.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FoodRecipes;
