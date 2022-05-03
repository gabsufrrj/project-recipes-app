import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ExploreDrinkByIngredients() {
  const [drinkIngredientsList, setDrinkIngredientsList] = useState();

  const fetchDrinkIngredientsFromApi = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const request = await fetch(URL);
    const json = await request.json();
    const result = json.drinks;
    const TWELVE = 12;
    const arrayOfDrinkIngredients = result.slice(0, TWELVE);
    setDrinkIngredientsList(arrayOfDrinkIngredients);
  };

  useEffect(() => {
    fetchDrinkIngredientsFromApi();
  }, []);

  console.log(drinkIngredientsList);

  return (
    <div>
      <Header title="Explore Ingredients" renderInput={ false } />
      {drinkIngredientsList && drinkIngredientsList.map((e, i) => (
        <section key={ i } data-testid={ `${i}-ingredient-card` }>
          <img
            data-testid={ `${i}-card-img` }
            alt={ `${e.strIngredient1}` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${e.strIngredient1}-Small.png` }
          />
          <h3 data-testid={ `${i}-card-name` }>
            {e.strIngredient1}
          </h3>
        </section>))}
      <Footer />
    </div>
  );
}

export default ExploreDrinkByIngredients;
