import React, { useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './MyContext';

function Provider({ children }) {
  const contextValue = {};
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
