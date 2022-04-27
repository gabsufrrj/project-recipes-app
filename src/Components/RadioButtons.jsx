import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../Context/MyContext';

function RadioButtons({ history: { location, push }, apiName }) {
  const {
    radioInputSelected,
    setRadioInputSelected,
    searchBarValue,
  } = useContext(recipesContext);

  const handleChange = ({ target }) => {
    setRadioInputSelected(target.id);
  };

  const checkAmountOfRecipes = (json) => {
    const valuesJson = Object.values(json)[0];
    if (valuesJson.length === 1) {
      const id = (location.pathname.includes('foods') ? 'idMeal' : 'idDrink');
      push(`${location.pathname}/${valuesJson[0][id]}`);
    }
    // const Newid = (location.pathname.includes('foods') ? 'idMeal' : 'idDrink');
    // console.log(valuesJson[0][Newid]);
  };

  const handleClick = async () => {
    const urlRadio = {
      ingredients: `https://www.${apiName}.com/api/json/v1/1/filter.php?i=${searchBarValue}`,
      name: `https://www.${apiName}.com/api/json/v1/1/search.php?s=${searchBarValue}`,
      'first-letter': `https://www.${apiName}.com/api/json/v1/1/search.php?f=${searchBarValue}`,
    };
    if (radioInputSelected === 'first-letter' && searchBarValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const request = await fetch(urlRadio[radioInputSelected]);
      const json = await request.json();
      checkAmountOfRecipes(json);
    }
  };

  return (
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

  );
}

export default RadioButtons;

RadioButtons.propTypes = {
  apiName: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};
