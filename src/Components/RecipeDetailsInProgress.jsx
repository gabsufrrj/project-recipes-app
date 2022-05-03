import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import getDate from '../helpers/getDate';

function RecipeDetailsInProgress(props) {
  const history = useHistory();
  const {
    detailsRecipe,
    progress,
    favoriteRecipes,
    typeOfRecipe,
    share,
    favorite,
    saveProgress,
    getIngredients,
  } = props;

  const nameRecipe = detailsRecipe[`str${typeOfRecipe()}`];

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
      tags: detailsRecipe.strTags.split(',').slice(0, 2),
    };
    const getDoneRecipes = getFromLocalStorage('doneRecipes', []);
    getDoneRecipes.push(recipe);
    localStorage.setItem('doneRecipes', JSON.stringify(getDoneRecipes));
  };

  return (
    <>
      <h2 data-testid="recipe-title">{nameRecipe}</h2>
      <h3 data-testid="recipe-category">{detailsRecipe.strCategory}</h3>
      <img
        data-testid="recipe-photo"
        src={ detailsRecipe[`str${typeOfRecipe()}Thumb`] }
        alt={ nameRecipe }
      />
      <button
        data-testid="share-btn"
        type="button"
        onClick={ share }
      >
        Compartilhar
      </button>
      <img
        data-testid="favorite-btn"
        src={ putFavoriteImage() }
        alt="Favorite_Image"
        onClick={ favorite }
        aria-hidden="true"
      />
      <div>
        {getIngredients().map((e, index) => (
          <div key={ e }>
            <label
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ e }
            >
              <input
                type="checkbox"
                id={ e }
                onChange={ saveProgress }
                checked={ (progress[nameRecipe]) ? (
                  progress[nameRecipe].includes(e)) : false }
              />
              {e}
            </label>
          </div>
        ))}
      </div>
      <p data-testid="instructions">{detailsRecipe.strInstructions}</p>
      <Link to="/done-recipes">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ finishRecipe }
          disabled={ (progress[nameRecipe]) ? (
            progress[nameRecipe].length !== getIngredients().length) : true }
        >
          Finish Recipe
        </button>
      </Link>
    </>
  );
}

export default RecipeDetailsInProgress;

RecipeDetailsInProgress.propTypes = {
  detailsRecipe: PropTypes.objectOf(PropTypes.any).isRequired,
  progress: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  favoriteRecipes: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  typeOfRecipe: PropTypes.func.isRequired,
  share: PropTypes.func.isRequired,
  favorite: PropTypes.func.isRequired,
  saveProgress: PropTypes.func.isRequired,
  getIngredients: PropTypes.func.isRequired,
};
