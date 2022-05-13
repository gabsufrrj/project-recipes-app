import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import recipesContext from '../Context/MyContext';
import '../CSS/ExploreDrinkByIngredients.css';

function ExploreDrinkByIngredients() {
  const { selectedIngredient, setSelectedIngredient } = useContext(recipesContext);
  const [drinkIngredientsList, setDrinkIngredientsList] = useState();
  const history = useHistory();

  const fetchDrinkIngredientsFromApi = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const request = await fetch(URL);
    const json = await request.json();
    const result = json.drinks;
    const TWELVE = 12;
    const arrayOfDrinkIngredients = result.slice(0, TWELVE);
    setDrinkIngredientsList(arrayOfDrinkIngredients);
  };

  const handleClick = (ingredient) => {
    setSelectedIngredient(ingredient);
    history.push('/drinks');
  };

  useEffect(() => {
    fetchDrinkIngredientsFromApi();
  }, []);

  console.log(selectedIngredient);

  return (
    <div>
      <Header title="Explore Ingredients" renderInput={ false } />
      <section className="explore-drink-by-ingredients-section">
        {drinkIngredientsList && drinkIngredientsList.map((e, i) => (
          <div
            aria-hidden="true"
            className="explore-drink-by-ingredients-card"
            onClick={ () => handleClick(e.strIngredient1) }
            key={ i }
            data-testid={ `${i}-ingredient-card` }
          >
            <img
              data-testid={ `${i}-card-img` }
              alt={ `${e.strIngredient1}` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${e.strIngredient1}-Small.png` }
            />
            <h3 data-testid={ `${i}-card-name` }>
              {e.strIngredient1}
            </h3>
          </div>))}
      </section>
      <Footer />
    </div>
  );
}

export default ExploreDrinkByIngredients;
