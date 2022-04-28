import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RadioButtons from './RadioButtons';
import recipesContext from '../Context/MyContext';

function Header({ title, renderInput, apiName, history }) {
  const { searchBarValue, setSearchBarValue } = useContext(recipesContext);
  const [showInput, setShowInput] = useState(false);

  const handleChange = ({ target }) => {
    setSearchBarValue(target.value);
  };

  return (
    <header>
      <Link to="/profile">
        <input
          type="image"
          data-testid="profile-top-btn"
          src="../images/profileIcon.svg"
          alt="profile"
        />
      </Link>

      <h1 data-testid="page-title">{ title }</h1>

      {renderInput && (
        <input
          type="image"
          onClick={ () => setShowInput(!showInput) }
          data-testid="search-top-btn"
          src="../images/searchIcon.svg"
          alt="search"
        />
      )}
      {showInput
        && <input
          onChange={ handleChange }
          placeholder="Search"
          data-testid="search-input"
          value={ searchBarValue }
        />}
      {(history) && <RadioButtons apiName={ apiName } history={ history } />}
    </header>
  );
}

Header.defaultProps = {
  history: undefined,
  apiName: undefined,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  renderInput: PropTypes.bool.isRequired,
  apiName: PropTypes.string,
  history: PropTypes.objectOf(PropTypes.any.isRequired),
};

export default Header;
