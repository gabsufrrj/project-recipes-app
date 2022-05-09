import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StartRecipe from './StartRecipeButton';
import FavoriteAndShareBtn from './FavoriteAndShareBtn';
import '../CSS/RecipeDetails.css';

function FoodDetails({ foodDetails: { strMealThumb, strMeal, strCategory,
  strInstructions, strYoutube }, foodDetails, recommendation }) {
  const [ingredients, setIngredients] = useState(['loading']);
  const [measure, setMeasure] = useState(['loading']);
  useEffect(() => {
    const myIngredients = [];
    const myMeasure = [];
    const key = Object.keys(foodDetails);
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
      <FavoriteAndShareBtn type="food" />
      <p data-testid="recipe-category">{ strCategory }</p>
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
      <h3>Recommended</h3>
      <div className="recommendation">
        {recommendation.map((element, i) => (
          <div key={ i } data-testid={ `${i}-recomendation-card` }>
            <img
              src={ element.strDrinkThumb }
              alt={ element.strDrink }
              className="r-image"
            />
            <span data-testid={ `${i}-recomendation-title` }>{element.strDrink}</span>
          </div>
        ))}
      </div>
      <StartRecipe type="foods" />
    </div>
    /* </div> */
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
  recommendation: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default FoodDetails;
