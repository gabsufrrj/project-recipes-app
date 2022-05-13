import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StartRecipe from './StartRecipeButton';
import FavoriteAndShareBtn from './FavoriteAndShareBtn';
import '../CSS/RecipeDetails.css';

function DrinkDetails({ drinkDetails: { strDrinkThumb, strDrink, strAlcoholic,
  strInstructions }, drinkDetails, recommendation }) {
  const [ingredients, setIngredients] = useState(['loading']);
  const [measure, setMeasure] = useState(['loading']);
  useEffect(() => {
    const myIngredients = [];
    const myMeasure = [];
    const key = Object.keys(drinkDetails);
    for (let i = 0; i < key.length; i += 1) {
      if (key[i].includes('strIngredient')
          && drinkDetails[key[i]] !== ''
          && drinkDetails[key[i]] !== null) {
        myIngredients.push(drinkDetails[key[i]]);
      }
    }
    for (let i = 0; i < key.length; i += 1) {
      if (key[i].includes('strMeasure')
          && drinkDetails[key[i]] !== '') {
        myMeasure.push(drinkDetails[key[i]]);
      }
    }
    setIngredients(myIngredients);
    setMeasure(myMeasure);
  }, []);
  return (
    <div className="container">
      <section className="title-section">
        <img
          data-testid="recipe-photo"
          alt="food"
          src={ strDrinkThumb }
          className="main-image"
        />
        <div className="title-div">
        <div className="title">
        <h2 data-testid="recipe-title">
          {' '}
          { strDrink }
        </h2>
        <span data-testid="recipe-category">{ strAlcoholic }</span>
        </div>
        <FavoriteAndShareBtn type="drink" />
      </div>
      </section>
      <section className="ingredients">
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient, i) => (
          <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
            { ingredient }
            {' '}
            -
            {measure[i]}
          </li>
        ))}
      </ul>
      </section>
      <section className="instructions">
      <h3>Instructions</h3>
      <p data-testid="instructions">{ strInstructions }</p>
      </section>
      <section className="recommendation">
      <h3>Recommended</h3>
      <div className="recommendation-images">
        {recommendation.map((element, i) => (
          <div key={ i } data-testid={ `${i}-recomendation-card` } className="r-images">
            <span data-testid={ `${i}-recomendation-title` }>{element.strMeal}</span>
            <img
              src={ element.strMealThumb }
              alt={ element.strMeal }
              className="r-image"
            />
          </div>
        ))}
      </div>
      </section>
      <StartRecipe type="drinks" />
    </div>
  );
}

DrinkDetails.propTypes = {
  drinkDetails: PropTypes.shape({
    strDrinkThumb: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
    strIngredient1: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
  }).isRequired,
  recommendation: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default DrinkDetails;
