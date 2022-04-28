import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../Context/MyContext';

function Recipes({ typeOfRecipe }) {
  const { recipes } = useContext(recipesContext);

  const number12 = 12;

  return (
    <div>
      {(recipes.length) && (
        recipes.slice(0, number12).map((e, index) => (
          <div key={ `${index}-recipe-card` } data-testid={ `${index}-recipe-card` }>
            <h2
              data-testid={ `${index}-card-name` }
            >
              {e[`str${typeOfRecipe()}`]}
            </h2>
            <img
              data-testid={ `${index}-card-img` }
              src={ e[`str${typeOfRecipe()}Thumb`] }
              alt={ e[`str${typeOfRecipe()}`] }
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Recipes;

Recipes.propTypes = {
  typeOfRecipe: PropTypes.func.isRequired,
};
