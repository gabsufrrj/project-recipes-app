import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeInProgress({ recipeId, apiName }) {
  const [detailsRecipe, setDatailsRecipe] = useState(null);
  const [progress, setProgress] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const history = useHistory();

  const getProgress = () => {
    let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes) {
      inProgressRecipes = [];
    }
    return inProgressRecipes;
  };

  const getFavoriteRecipesFromStorage = () => {
    let getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!getFavoriteRecipes) {
      getFavoriteRecipes = [];
    }
    return getFavoriteRecipes;
  };

  useEffect(() => {
    const fetchDetailsRecipe = async () => {
      const request = await fetch(`https://www.${apiName}.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const json = await request.json();
      const datailsRecipeObject = Object.values(json)[0][0];
      setDatailsRecipe(datailsRecipeObject);
      console.log(datailsRecipeObject);
    };
    fetchDetailsRecipe();
    setProgress(getProgress());
    setFavoriteRecipes(getFavoriteRecipesFromStorage());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const typeOfRecipe = () => {
    const { location: { pathname } } = history;
    return (pathname.includes('foods') ? 'Meal' : 'Drink');
  };

  const getIngredients = () => {
    const ingredients = [];
    const datailsRecipeKeys = Object.keys(detailsRecipe);
    const ingredientsKeys = datailsRecipeKeys.filter((e) => e.includes('strIngredient'));
    ingredientsKeys.forEach((e) => (
      (detailsRecipe[e]) && ingredients.push(detailsRecipe[e])));
    return ingredients;
  };

  const saveAtLocalStorage = ({ target: { id, checked } }) => {
    let inProgressRecipes = getProgress();
    if (checked) {
      inProgressRecipes.push(id);
    } else {
      inProgressRecipes = inProgressRecipes.filter((e) => e !== id);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    setProgress(inProgressRecipes);
  };

  const share = ({ target }) => {
    const number1 = 1;
    let url = window.location.href.split('/');
    url = url.slice(0, -number1).join('/');
    navigator.clipboard.writeText(url);
    target.innerHTML = 'Link copied!';
  };

  const favorite = () => {
    const recipe = {
      id: detailsRecipe[`id${typeOfRecipe()}`],
      type: (history.location.pathname.includes('foods')) ? 'food' : 'drink',
      nationality: (detailsRecipe.strArea) ? detailsRecipe.strArea : '',
      category: detailsRecipe.strCategory,
      alcoholicOrNot: (detailsRecipe.strAlcoholic) ? 'Alcoholic' : '',
      name: detailsRecipe[`str${typeOfRecipe()}`],
      image: detailsRecipe[`str${typeOfRecipe()}Thumb`],
    };
    let getFavoriteRecipes = getFavoriteRecipesFromStorage();
    if (getFavoriteRecipes.some((e) => e.name === recipe.name)) {
      getFavoriteRecipes = getFavoriteRecipes.filter((e) => e.name !== recipe.name);
    } else {
      getFavoriteRecipes.push(recipe);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(getFavoriteRecipes));
    setFavoriteRecipes(getFavoriteRecipes);
  };

  const putFavoriteImage = (nameRecipe) => (
    (favoriteRecipes.some((e) => e.name === nameRecipe)) ? blackHeartIcon : whiteHeartIcon
  );

  return (
    <section>
      {(detailsRecipe) && (
        <>
          <h2 data-testid="recipe-title">{detailsRecipe[`str${typeOfRecipe()}`]}</h2>
          <h3 data-testid="recipe-category">{detailsRecipe.strCategory}</h3>
          <img
            data-testid="recipe-photo"
            src={ detailsRecipe[`str${typeOfRecipe()}Thumb`] }
            alt={ detailsRecipe[`str${typeOfRecipe()}`] }
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
            src={ putFavoriteImage(detailsRecipe[`str${typeOfRecipe()}`]) }
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
                    onChange={ saveAtLocalStorage }
                    checked={ progress.includes(e) }
                  />
                  {e}
                </label>
              </div>
            ))}
          </div>
          <p data-testid="instructions">{detailsRecipe.strInstructions}</p>
          <button data-testid="finish-recipe-btn" type="button">Finalizar</button>
        </>)}
    </section>
  );
}

export default RecipeInProgress;

RecipeInProgress.propTypes = {
  recipeId: PropTypes.string.isRequired,
  apiName: PropTypes.string.isRequired,
};
