import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../Context/MyContext';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ExploreFoodByIngredients() {
  const { setSelectedIngredient } = useContext(recipesContext);
  const [ingredientsList, setIngredientsList] = useState();
  const history = useHistory();

  const fetchFoodIngredientsFromApi = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const request = await fetch(URL);
    const json = await request.json();
    const result = json.meals;
    const TWELVE = 12;
    const arrayOfIngredients = result.slice(0, TWELVE);
    setIngredientsList(arrayOfIngredients);
  };

  const handleClick = (ingredient) => {
    setSelectedIngredient(ingredient);
    history.push('/foods');
  };

  useEffect(() => {
    fetchFoodIngredientsFromApi();
  }, []);

  return (
    <div>
      <Header title="Explore Ingredients" renderInput={ false } />
      {ingredientsList && ingredientsList.map((e, i) => (
        <section
          key={ i }
          data-testid={ `${i}-ingredient-card` }
          onClick={ () => handleClick(e.strIngredient) }
          aria-hidden="true"
        >

          <img
            data-testid={ `${i}-card-img` }
            alt={ `${e.strIngredient}` }
            src={ `https://www.themealdb.com/images/ingredients/${e.strIngredient}-Small.png` }
          />
          <h3 name={ e.strIngredient } data-testid={ `${i}-card-name` }>
            {e.strIngredient}
          </h3>

        </section>))}
      <Footer />
    </div>
  );
}

export default ExploreFoodByIngredients;
