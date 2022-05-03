import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ExploreFoodByIngredients() {
  const [ingredientsList, setIngredientsList] = useState();

  // const url fetch ingredient = 'www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}'

  const fetchFoodIngredientsFromApi = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const request = await fetch(URL);
    const json = await request.json();
    const result = json.meals;
    const TWELVE = 12;
    const arrayOfIngredients = result.slice(0, TWELVE);
    setIngredientsList(arrayOfIngredients);
  };

  useEffect(() => {
    fetchFoodIngredientsFromApi();
  }, []);

  return (
    <div>
      <Header title="Explore Ingredients" renderInput={ false } />
      {ingredientsList && ingredientsList.map((e, i) => (
        <section key={ i } data-testid={ `${i}-ingredient-card` }>
          <img
            data-testid={ `${i}-card-img` }
            alt={ `${e.strIngredient}` }
            src={ `https://www.themealdb.com/images/ingredients/${e.strIngredient}-Small.png` }
          />
          <h3 data-testid={ `${i}-card-name` }>
            {e.strIngredient}
          </h3>
        </section>))}
      <Footer />
    </div>
  );
}

export default ExploreFoodByIngredients;
