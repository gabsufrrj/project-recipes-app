import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeDetailsInProgress from './RecipeDetailsInProgress';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import recipesContext from '../Context/MyContext';

function RecipeInProgress({ recipeId, apiName }) {
  const { isFetching, setIsFetching } = useContext(recipesContext);
  const [detailsRecipe, setDatailsRecipe] = useState(null);
  const [progress, setProgress] = useState({});
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const history = useHistory();

  const typeOfRecipe = () => {
    const { location: { pathname } } = history;
    return (pathname.includes('foods') ? 'Meal' : 'Drink');
  };

  useEffect(() => {
    const fetchDetailsRecipe = async () => {
      try {
        setIsFetching(true);
        const request = await fetch(`https://www.${apiName}.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const json = await request.json();
        const datailsRecipeObject = Object.values(json)[0][0];
        setDatailsRecipe(datailsRecipeObject);
      } catch (error) {
        global.alert('Oops, an error has occurred. Reload the page!');
      }
      setIsFetching(false);
    };
    fetchDetailsRecipe();
    setProgress(getFromLocalStorage('inProgressRecipes', {}));
    setFavoriteRecipes(getFromLocalStorage('favoriteRecipes', []));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIngredients = () => {
    const ingredients = [];
    const datailsRecipeKeys = Object.keys(detailsRecipe);
    const ingredientsKeys = datailsRecipeKeys.filter((e) => e.includes('strIngredient'));
    ingredientsKeys.forEach((e) => (
      (detailsRecipe[e]) && ingredients.push(detailsRecipe[e])));
    return ingredients;
  };

  const saveProgress = ({ target: { id, checked } }) => {
    const inProgressRecipes = getFromLocalStorage('inProgressRecipes', {});
    const nameRecipe = detailsRecipe[`str${typeOfRecipe()}`];
    if (!inProgressRecipes[nameRecipe]) {
      inProgressRecipes[nameRecipe] = [];
    }
    if (checked) {
      inProgressRecipes[nameRecipe].push(id);
    } else {
      inProgressRecipes[nameRecipe] = (
        inProgressRecipes[nameRecipe].filter((e) => e !== id));
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    setProgress(inProgressRecipes);
  };

  const share = ({ target }) => {
    const number1 = 1;
    let url = window.location.href.split('/');
    url = url.slice(0, -number1).join('/');
    navigator.clipboard.writeText(url);
    target.parentElement.querySelector('.link-copied').innerHTML = 'Link copied!';
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
    let getFavoriteRecipes = getFromLocalStorage('favoriteRecipes', []);
    if (getFavoriteRecipes.some((e) => e.name === recipe.name)) {
      getFavoriteRecipes = getFavoriteRecipes.filter((e) => e.name !== recipe.name);
    } else {
      getFavoriteRecipes.push(recipe);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(getFavoriteRecipes));
    setFavoriteRecipes(getFavoriteRecipes);
  };

  return (
    <section className="recipe-in-progress-section">
      <h2>Recipe in progress</h2>
      {(!isFetching && detailsRecipe) && (
        <RecipeDetailsInProgress
          detailsRecipe={ detailsRecipe }
          progress={ progress }
          favoriteRecipes={ favoriteRecipes }
          typeOfRecipe={ typeOfRecipe }
          share={ share }
          favorite={ favorite }
          saveProgress={ saveProgress }
          getIngredients={ getIngredients }
        />
      )}
      {(isFetching) && <h2>Loading...</h2>}
    </section>
  );
}

export default RecipeInProgress;

RecipeInProgress.propTypes = {
  recipeId: PropTypes.string.isRequired,
  apiName: PropTypes.string.isRequired,
};
