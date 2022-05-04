import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DrinkDetails from '../Components/DrinkDetails';

function DetailsDrinkRecipes({ match }) {
  const [drinkDetails, setDrinkDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState();
  useEffect(() => {
    const getDrinkDetails = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${match.params.id}`);
      const result = await response.json();
      console.log(result);
      setDrinkDetails(result.drinks[0]);
      setLoading(false);
    };
    const getFoods = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const result = await response.json();
      setFoods(result);
    };
    getDrinkDetails();
    getFoods();
  }, []);

  return (
    <div>
      {loading
        ? <h1>Loading...</h1>
        : <DrinkDetails drinkDetails={ drinkDetails } recommendation={ foods } />}
    </div>
  );
}

DetailsDrinkRecipes.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DetailsDrinkRecipes;
