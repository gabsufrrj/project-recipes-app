import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../Context/MyContext';
import Recipes from './Recipes';

function RadioButtons({ history: { location, push }, apiName }) {
  const {
    radioInputSelected,
    setRadioInputSelected,
    searchBarValue,
    setRecipes,
  } = useContext(recipesContext);

  const handleChange = ({ target }) => {
    setRadioInputSelected(target.id);
  };

  const typeOfRecipe = () => (
    (location.pathname.includes('foods') ? 'Meal' : 'Drink')
  );

  const checkAmountOfRecipes = (json) => {
    const valuesJson = Object.values(json)[0];
    if (valuesJson === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setRecipes(valuesJson);
    if (valuesJson.length === 1) {
      push(`${location.pathname}/${valuesJson[0][`id${typeOfRecipe()}`]}`);
    }
  };

  const getApi = async () => {
    const urlRadio = {
      ingredients: `https://www.${apiName}.com/api/json/v1/1/filter.php?i=${searchBarValue}`,
      name: `https://www.${apiName}.com/api/json/v1/1/search.php?s=${searchBarValue}`,
      'first-letter': `https://www.${apiName}.com/api/json/v1/1/search.php?f=${searchBarValue}`,
    };
    try {
      const request = await fetch(urlRadio[radioInputSelected]);
      const json = await request.json();
      console.log(json);
      checkAmountOfRecipes(json);
    } catch (error) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const handleClick = () => {
    if (radioInputSelected === 'first-letter' && searchBarValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      getApi();
    }
  };

  return (
    <section>
      <div>
        <label htmlFor="ingredients">
          Ingredients
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredients"
            name="search-bar"
            value={ radioInputSelected }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            data-testid="name-search-radio"
            type="radio"
            id="name"
            name="search-bar"
            value={ radioInputSelected }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="first-letter">
          First Letter
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="first-letter"
            name="search-bar"
            value={ radioInputSelected }
            onChange={ handleChange }
          />
        </label>
        <br />
        <button
          data-testid="exec-search-btn"
          onClick={ handleClick }
          type="button"
        >
          Search
        </button>
      </div>
      <Recipes typeOfRecipe={ typeOfRecipe } />
    </section>

  );
}

export default RadioButtons;

RadioButtons.propTypes = {
  apiName: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};
