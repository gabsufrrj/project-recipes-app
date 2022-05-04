import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FoodDetails from '../Components/FoodDetails';

function DetailsFoodRecipes({ match }) {
  const [foodDetails, setFoodDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [drinks, setDrinks] = useState();
  useEffect(() => {
    const getFoodDetails = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match.params.id}`);
      const result = await response.json();
      console.log(result.meals[0]);
      setFoodDetails(result.meals[0]);
      setLoading(false);
    };
    const getDrinks = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const result = await response.json();
      setDrinks(result);
    };
    getFoodDetails();
    getDrinks();
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
