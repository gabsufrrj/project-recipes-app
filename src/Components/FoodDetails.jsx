import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function FoodDetails({ foodDetails: { strMealThumb, strMeal, strCategory,
  strInstructions, strYoutube }, foodDetails }) {
  console.log(foodDetails.strMeal);
  const [ingredients, setIngredients] = useState(['loading']);
  const [measure, setMeasure] = useState(['loading']);
  useEffect(() => {
    const myIngredients = [];
    const myMeasure = [];
    const key = Object.keys(foodDetails);
    console.log(key);
    for (let i = 0; i < key.length; i += 1) {
      if (key[i].includes('strIngredient')
        && foodDetails[key[i]] !== '') {
        myIngredients.push(foodDetails[key[i]]);
      }
    }
    for (let i = 0; i < key.length; i += 1) {
      if (key[i].includes('strMeasure')
        && foodDetails[key[i]] !== ' ') {
        myMeasure.push(foodDetails[key[i]]);
      }
    }
    console.log(myMeasure, myIngredients);
    setIngredients(myIngredients);
    setMeasure(myMeasure);
  }, []);
  return (
    <div>
      <img data-testid="recipe-photo" alt="food" src={ strMealThumb } />
      <h2 data-testid="recipe-title">
        {' '}
        { strMeal }
      </h2>
      <img data-testid="share-btn" alt="share" />
      <img data-testid="favorite-btn" alt="favorite" />
      <p data-testid="recipe-category">{ strCategory }</p>
      <img data-testid="share-btn" alt="" />
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
      <h3>Vídeo</h3>
      <video data-testid="video">
        <source src={ strYoutube } />
        <track kind="captions" srcLang="pt" />
      </video>
      <div data-testid="0-recomendation-card">
        <h3>Recommended</h3>
      </div>
      <img data-testid="start-recipe-btn" alt="start" />
    </div>
  );
}

FoodDetails.propTypes = {
  foodDetails: PropTypes.shape({
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strIngredient1: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
    strYoutube: PropTypes.string.isRequired,
  }).isRequired,
};

export default FoodDetails;
