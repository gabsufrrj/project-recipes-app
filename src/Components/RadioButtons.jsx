import React, { useContext } from 'react';
import recipesContext from '../Context/MyContext';

function RadioButtons() {
  const { radioInputSelected,
    setRadioInputSelected,
    searchBarValue } = useContext(recipesContext);

  const handleChange = ({ target }) => {
    setRadioInputSelected(target.id);
    console.log(radioInputSelected);
  };

  const handleClick = async () => {
    if (radioInputSelected === 'ingredients') {
      const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchBarValue}`);
      console.log(request);
      return request;
    }
    if (radioInputSelected === 'name') {
      const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBarValue.toLowerCase()}`);
      console.log(request);
      return request;
    }
    if (radioInputSelected === 'first-letter') {
      if (searchBarValue.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchBarValue.toLowerCase()}`);
      console.log(request);
      return request;
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
