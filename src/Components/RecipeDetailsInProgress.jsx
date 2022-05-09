import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import getDate from '../helpers/getDate';

function RecipeDetailsInProgress(props) {
  const history = useHistory();
  const {
    recipeId,
    detailsRecipe,
    progress,
    favoriteRecipes,
    typeOfRecipe,
    share,
    favorite,
    saveProgress,
  } = props;

  const nameRecipe = detailsRecipe[`str${typeOfRecipe()}`];

  const getIngredients = () => {
    const datailsRecipeEntries = Object.entries(detailsRecipe);
    const filterOnlyIgredients = datailsRecipeEntries.filter((e) => (
      e[0].includes('strIngredient')));
    let ingredients = filterOnlyIgredients.filter((e) => e[1]);
    ingredients = ingredients.map((e) => e[1]);
    return ingredients;
  };

  const getMeasures = () => {
    const datailsRecipeEntries = Object.entries(detailsRecipe);
    const filterOnlyMeasures = datailsRecipeEntries.filter((e) => (
      e[0].includes('strMeasure')));
    let measures = filterOnlyMeasures.filter((e) => e[1]);
    measures = measures.map((e) => e[1]);
    return measures;
  };

  const putFavoriteImage = () => (
    (favoriteRecipes.some((e) => e.name === nameRecipe)) ? blackHeartIcon : whiteHeartIcon
  );

  const finishRecipe = () => {
    const recipe = {
      id: detailsRecipe[`id${typeOfRecipe()}`],
      type: (history.location.pathname.includes('foods')) ? 'food' : 'drink',
      nationality: (detailsRecipe.strArea) ? detailsRecipe.strArea : '',
      category: detailsRecipe.strCategory,
      alcoholicOrNot: (detailsRecipe.strAlcoholic) ? 'Alcoholic' : '',
      name: detailsRecipe[`str${typeOfRecipe()}`],
      image: detailsRecipe[`str${typeOfRecipe()}Thumb`],
      doneDate: getDate(),
      tags: (detailsRecipe.strTags) ? (
        detailsRecipe.strTags.split(',').slice(0, 2)) : [],
    };
    const getDoneRecipes = getFromLocalStorage('doneRecipes', []);
    getDoneRecipes.push(recipe);
    localStorage.setItem('doneRecipes', JSON.stringify(getDoneRecipes));
  };

  return (
    <>
      <div className="card">
        <div className="card-img-div">
          <img
            data-testid="recipe-photo"
            src={ detailsRecipe[`str${typeOfRecipe()}Thumb`] }
            alt={ nameRecipe }
          />
        </div>
        <div className="card-info">
          <h3 data-testid="recipe-category">{detailsRecipe.strCategory}</h3>
          <h2 data-testid="recipe-title">{nameRecipe}</h2>
          <div className="favorite-share-div">
            <img
              data-testid="favorite-btn"
              src={ putFavoriteImage() }
              alt="Favorite_Image"
              onClick={ favorite }
              aria-hidden="true"
            />
            <img
              data-testid="share-btn"
              src={ shareIcon }
              alt="Share"
              onClick={ share }
              aria-hidden="true"
            />
            <span className="link-copied">Link copied!</span>
          </div>
        </div>
      </div>
      <div className="ingredients-div">
        <h3>Ingredients</h3>
        {getIngredients().map((e, index) => (
          <div key={ `ingredient-${index}` }>
            <label
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ `ingredient-${index}` }
            >
              <input
                type="checkbox"
                id={ `ingredient-${index}` }
                onChange={ saveProgress }
                checked={ (progress[recipeId]) ? (
                  progress[recipeId].includes(`ingredient-${index}`)) : false }
              />
              {e}
              {` - ${getMeasures()[index]}`}
            </label>
          </div>
        ))}
      </div>
      <div className="instructions-div">
        <h3>Instructions</h3>
        <p data-testid="instructions">{detailsRecipe.strInstructions}</p>
      </div>
      <div className="finish-btn-div">
        <Link to="/done-recipes">
          <button
            data-testid="finish-recipe-btn"
            type="button"
            onClick={ finishRecipe }
            disabled={ (progress[recipeId]) ? (
              progress[recipeId].length !== getIngredients().length) : true }
          >
            Finish Recipe
          </button>
        </Link>
      </div>
    </>
  );
}

export default RecipeDetailsInProgress;

RecipeDetailsInProgress.propTypes = {
  recipeId: PropTypes.string.isRequired,
  detailsRecipe: PropTypes.objectOf(PropTypes.any).isRequired,
  progress: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  favoriteRecipes: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  typeOfRecipe: PropTypes.func.isRequired,
  share: PropTypes.func.isRequired,
  favorite: PropTypes.func.isRequired,
  saveProgress: PropTypes.func.isRequired,
};
