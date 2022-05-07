import getFromLocalStorage from './getFromLocalStorage';

const toFavoriteRecipeInProgress = (recipe) => {
  let getFavoriteRecipes = getFromLocalStorage('favoriteRecipes', []);
  if (getFavoriteRecipes.some((e) => e.name === recipe.name)) {
    getFavoriteRecipes = getFavoriteRecipes.filter((e) => e.name !== recipe.name);
  } else {
    getFavoriteRecipes.push(recipe);
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(getFavoriteRecipes));
  return getFavoriteRecipes;
};

export default toFavoriteRecipeInProgress;
