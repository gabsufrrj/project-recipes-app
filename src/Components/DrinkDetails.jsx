import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StartRecipe from './StartRecipeButton';
import FavoriteAndShareBtn from './FavoriteAndShareBtn';

function DrinkDetails({ drinkDetails: { strDrinkThumb, strDrink, strAlcoholic,
  strInstructions }, drinkDetails }) {
  const [ingredients, setIngredients] = useState(['loading']);
  const [measure, setMeasure] = useState(['loading']);
  useEffect(() => {
    const myIngredients = [];
    const myMeasure = [];
    const key = Object.keys(drinkDetails);
    console.log(key);
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
    console.log(myMeasure, myIngredients);
    setIngredients(myIngredients);
    setMeasure(myMeasure);
  }, []);
  return (
    <div>
      <img data-testid="recipe-photo" alt="food" src={ strDrinkThumb } />
      <h2 data-testid="recipe-title">
        {' '}
        { strDrink }
      </h2>
      <FavoriteAndShareBtn />
      <p data-testid="recipe-category">{ strAlcoholic }</p>
      <img data-testid="share-btn" alt="share" />
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
      <h3>Instructions</h3>
      <p data-testid="instructions">{ strInstructions }</p>
      <div data-testid="0-recomendation-card">
        <h3>Recommended</h3>
      </div>
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
};

export default DrinkDetails;
