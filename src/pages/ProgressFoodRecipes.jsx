import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function ProgressFoodRecipes(props) {
  const [detailsRecipe, setDatailsRecipe] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchDetailsRecipe = async () => {
      const { match: { params: { id } } } = props;
      const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const json = await request.json();
      const datailsRecipeObject = Object.values(json)[0][0];
      setDatailsRecipe(datailsRecipeObject);
      console.log(datailsRecipeObject);
    };
    fetchDetailsRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const typeOfRecipe = () => {
    const { location } = history;
    return (location.pathname.includes('foods') ? 'Meal' : 'Drink');
  };

  const getIngredients = () => {
    const ingredients = [];
    const datailsRecipeKeys = Object.keys(detailsRecipe);
    const ingredientsKeys = datailsRecipeKeys.filter((e) => e.includes('strIngredient'));
    ingredientsKeys.forEach((e) => (
      (detailsRecipe[e]) && ingredients.push(detailsRecipe[e])));
    return ingredients;
  };

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
          <button data-testid="share-btn" type="button">Compartilhar</button>
          <button data-testid="favorite-btn" type="button">Favoritar</button>
          <ul>
            {getIngredients().map((e, index) => (
              <li key={ e } data-testid={ `${index}-ingredient-step` }>{e}</li>
            ))}
          </ul>
          <p data-testid="instructions">{detailsRecipe.strInstructions}</p>
          <button data-testid="finish-recipe-btn" type="button">Finalizar</button>
        </>)}
    </section>
  );
}

export default ProgressFoodRecipes;

ProgressFoodRecipes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
