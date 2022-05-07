import getFromLocalStorage from './getFromLocalStorage';

const saveRecipeProgress = (props) => {
  const { recipeId, nameRecipe, checked, keyType, recipesInProgressObject } = props;
  let inProgressRecipesFromStorage = getFromLocalStorage('inProgressRecipes', {});
  const inProgressRecipes = recipesInProgressObject();
  if (!inProgressRecipes[recipeId]) {
    inProgressRecipes[recipeId] = [];
  }
  if (checked) {
    inProgressRecipes[recipeId].push(nameRecipe);
  } else {
    inProgressRecipes[recipeId] = (
      inProgressRecipes[recipeId].filter((e) => e !== nameRecipe));
  }
  inProgressRecipesFromStorage = {
    ...inProgressRecipesFromStorage,
    [keyType]: {
      ...inProgressRecipesFromStorage[keyType],
      [recipeId]: inProgressRecipes[recipeId],
    },
  };
  localStorage.setItem('inProgressRecipes',
    JSON.stringify(inProgressRecipesFromStorage));
  return inProgressRecipes;
};

export default saveRecipeProgress;
