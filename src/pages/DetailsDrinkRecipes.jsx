import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DrinkDetails from '../Components/DrinkDetails';

function DetailsDrinkRecipes({ match }) {
  const [drinkDetails, setDrinkDetails] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getFoodDetails = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${match.params.id}`);
      const result = await response.json();
      console.log(result);
      setDrinkDetails(result.drinks[0]);
      setLoading(false);
    };
    getFoodDetails();
  }, []);

  return (
    <div>
      {loading ? <h1>Loading...</h1> : <DrinkDetails drinkDetails={ drinkDetails } />}
    </div>
  );
}

DetailsDrinkRecipes.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DetailsDrinkRecipes;
