const recipeObjectModel = (propsRecipeObjectModel) => {
  const { detailsRecipe, typeOfRecipe, history } = propsRecipeObjectModel;
  return {
    id: detailsRecipe[`id${typeOfRecipe}`],
    type: (history.location.pathname.includes('foods')) ? 'food' : 'drink',
    nationality: (detailsRecipe.strArea) ? detailsRecipe.strArea : '',
    category: detailsRecipe.strCategory,
    alcoholicOrNot: (detailsRecipe.strAlcoholic) ? 'Alcoholic' : '',
    name: detailsRecipe[`str${typeOfRecipe}`],
    image: detailsRecipe[`str${typeOfRecipe}Thumb`],
  };
};

export default recipeObjectModel;
