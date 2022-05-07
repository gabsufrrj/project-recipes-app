import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import RadioButtons from '../Components/RadioButtons';
import Footer from '../Components/Footer';
import FilterByCategories from '../Components/FilterByCategory';
import Recipes from '../Components/Recipes';
import recipesContext from '../Context/MyContext';
import firstFetch from '../helpers/firstFetch';

function FoodRecipes({ history }) {
  const {
    isFetching,
    setIsFetching,
    selectedIngredient,
    setSelectedIngredient,
    setRecipes,
  } = useContext(recipesContext);

  useEffect(() => {
    firstFetch('themealdb', setRecipes, selectedIngredient, setIsFetching);
    return () => {
      setSelectedIngredient(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header title="Foods" renderInput />
      <RadioButtons apiName="themealdb" history={ history } />
      <FilterByCategories apiName="themealdb" />
      {(!isFetching) ? (
        <Recipes history={ history } />
      ) : <h2>Loading...</h2>}
      <Footer />
    </div>
  );
}

export default FoodRecipes;

FoodRecipes.propTypes = {
  history: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};
