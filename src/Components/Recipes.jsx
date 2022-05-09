import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import recipesContext from '../Context/MyContext';
import '../CSS/Recipes.css';

function Recipes({ history: { location } }) {
  const { recipes } = useContext(recipesContext);

  const typeOfRecipe = () => (
    (location.pathname.includes('foods') ? 'Meal' : 'Drink')
  );

  const number12 = 12;

  return (
    <section className="recipes-section">
      {(recipes.length > 0) && (
        recipes.slice(0, number12).map((e, index) => (
          <Link
            to={ (location.pathname.includes('foods')) ? (
              `/foods/${e[`id${typeOfRecipe()}`]}`) : (
              `/drinks/${e[`id${typeOfRecipe()}`]}`) }
            key={ `${index}-recipe-card` }
          >
            <div data-testid={ `${index}-recipe-card` }>
              <h2
                data-testid={ `${index}-card-name` }
              >
                {e[`str${typeOfRecipe()}`]}
              </h2>
              <img
                style={ { width: '100px' } }
                data-testid={ `${index}-card-img` }
                src={ e[`str${typeOfRecipe()}Thumb`] }
                alt={ e[`str${typeOfRecipe()}`] }
              />
            </div>
          </Link>
        ))
      )}
    </section>
  );
}

export default Recipes;

Recipes.propTypes = {
  history: PropTypes.shape(PropTypes.any.isRequired).isRequired,
};
