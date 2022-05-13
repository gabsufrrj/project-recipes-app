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
    <div className="container">
      <section className="title-section">
        <img
          data-testid="recipe-photo"
          alt="food"
          src={ strMealThumb }
          className="main-image"
        />
        <div className="title-div">
          <div className="title">
            <h2 data-testid="recipe-title">
              {' '}
              { strMeal }
            </h2>
            <span data-testid="recipe-category">{ strCategory }</span>
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
      <section className="video">
        <h3>Vídeo</h3>
        <video>
          <source src={ strYoutube } />
          <track kind="captions" srcLang="pt" />
        </video>
      </section>
      <section className="recommendation">
        <h3>Recommended</h3>
        <div className="recommendation-images">
          {recommendation.map((element, i) => (
            <div key={ i } data-testid={ `${i}-recomendation-card` } className="r-images">
              <span data-testid={ `${i}-recomendation-title` }>{element.strDrink}</span>
              <img
                src={ element.strDrinkThumb }
                alt={ element.strDrink }
                className="r-image"
              />
            </div>
          ))}
        </div>
      </section>
      <StartRecipe type="foods" />
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
  recommendation: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default FoodDetails;
