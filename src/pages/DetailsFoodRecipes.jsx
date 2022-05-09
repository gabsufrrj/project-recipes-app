import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FoodDetails from '../Components/FoodDetails';
import recipesContext from '../Context/MyContext';

function DetailsFoodRecipes({ match }) {
  const [foodDetails, setFoodDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [drinks, setDrinks] = useState();
  const { setId } = useContext(recipesContext);
  useEffect(() => {
    const getFoodDetails = async () => {
      const { id } = match.params;
      setId(id);
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const result = await response.json();
      console.log(result.meals[0]);
      setFoodDetails(result.meals[0]);
    };
    const getDrinks = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const result = await response.json();
      const numberOfRecommendations = 6;
      const recommendation = result.drinks.slice(0, numberOfRecommendations);
      setDrinks(recommendation);
    };
    const fetchItens = async () => {
      await getFoodDetails();
      await getDrinks();
      setLoading(false);
    };
    fetchItens();
  }, []);

  return (
    <div>
      {loading ? <h1>Loading...</h1>
        : <FoodDetails foodDetails={ foodDetails } recommendation={ drinks } />}
    </div>
  );
}

DetailsFoodRecipes.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DetailsFoodRecipes;
