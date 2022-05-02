import React, { useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './MyContext';

function Provider({ children }) {
  const [searchBarValue, setSearchBarValue] = useState('');
  const [radioInputSelected, setRadioInputSelected] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const contextValue = {
    radioInputSelected,
    setRadioInputSelected,
    searchBarValue,
    setSearchBarValue,
    recipes,
    setRecipes,
  };

  return (
    <recipesContext.Provider value={ contextValue }>
      {children}
    </recipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
