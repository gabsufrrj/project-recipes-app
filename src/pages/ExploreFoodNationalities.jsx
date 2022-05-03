import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Recipes from '../Components/Recipes';
import recipesContext from '../Context/MyContext';

function ExploreFoodNationalities({ history }) {
  const { recipes, setRecipes } = useContext(recipesContext);
  const [selectedNationality, setSelectedNationality] = useState('American');
  const [nationalitiesList, setNationalitiesList] = useState([]);

  const fetchFoodNationalitiesFromApi = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const request = await fetch(URL);
    const json = await request.json();
    const arrayOfNationalities = json.meals;
    setNationalitiesList(arrayOfNationalities);
    return json;
  };

  const fetchFilteredFoodsByNationalities = async () => {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedNationality}`;
    const request = await fetch(URL);
    const json = await request.json();
    setRecipes(json.meals);
  };

  const handleChange = ({ target }) => {
    setSelectedNationality(target.value);
  };

  useEffect(() => {
    fetchFoodNationalitiesFromApi();
  }, []);

  useEffect(() => {
    fetchFilteredFoodsByNationalities();
  }, [selectedNationality]);

  console.log(selectedNationality);
  console.log(recipes);

  return (
    <div>
      <Header title="Explore Nationalities" renderInput />
      <select onChange={ handleChange } data-testid="explore-by-nationality-dropdown">
        {nationalitiesList && nationalitiesList.map((e, i) => (
          <option key={ i } data-testid={ `${e.strArea}-option` }>
            {e.strArea}
          </option>
        ))}
      </select>
      <Recipes history={ history } />
      <Footer />
    </div>
  );
}

ExploreFoodNationalities.propTypes = {
  history: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};

export default ExploreFoodNationalities;
