import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../Context/MyContext';
import '../CSS/RadioButtons.css';

function RadioButtons({ history: { location, push }, apiName }) {
  const {
    radioInputSelected,
    setRadioInputSelected,
    searchBarValue,
    setRecipes,
    setIsFetching,
  } = useContext(recipesContext);

  const handleChange = ({ target }) => {
    setRadioInputSelected(target.id);
  };

  const typeOfRecipe = () => (
    (location.pathname.includes('foods') ? 'Meal' : 'Drink')
  );

  const checkAmountOfRecipes = (json) => {
    const valuesJson = Object.values(json)[0];
    if (!valuesJson) {
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
      setIsFetching(true);
      const request = await fetch(urlRadio[radioInputSelected]);
      const json = await request.json();
      checkAmountOfRecipes(json);
    } catch (error) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setIsFetching(false);
  };

  const handleClick = () => {
    if (radioInputSelected === 'first-letter' && searchBarValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      getApi();
    }
  };

  return (
    <nav className="radio-btn-nav">
      <div className="radio-btn-div">
        <label htmlFor="ingredients">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredients"
            name="search-bar"
            value={ radioInputSelected }
            onChange={ handleChange }
          />
          Ingredients
        </label>
        <label htmlFor="name">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="name"
            name="search-bar"
            value={ radioInputSelected }
            onChange={ handleChange }
          />
          Name
        </label>
        <label htmlFor="first-letter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="first-letter"
            name="search-bar"
            value={ radioInputSelected }
            onChange={ handleChange }
          />
          First Letter
        </label>
      </div>
      <div className="search-btn-div">
        <button
          data-testid="exec-search-btn"
          onClick={ handleClick }
          type="button"
        >
          Search
        </button>

      </div>
    </nav>

  );
}

export default RadioButtons;

RadioButtons.propTypes = {
  apiName: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};
