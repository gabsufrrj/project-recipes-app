import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import recipesContext from '../Context/MyContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../CSS/Header.css';

function Header({ title, renderInput }) {
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
          src={ profileIcon }
          alt="profile"
        />
      </Link>

      <h1 data-testid="page-title">{ title }</h1>

      {renderInput && (
        <input
          type="image"
          onClick={ () => setShowInput(!showInput) }
          data-testid="search-top-btn"
          src={ searchIcon }
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
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  renderInput: PropTypes.bool.isRequired,
};

export default Header;
