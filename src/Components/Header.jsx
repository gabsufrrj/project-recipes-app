import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header({ title }) {
  const [showInput, setShowInput] = useState(false);

  return (
    <header>
      <Link to="/profile">
        <button
          type="button"
          data-testid="profile-top-btn"
        >
          Profile
        </button>
      </Link>

      <h1 data-testid="page-title">{ title }</h1>

      <button
        type="button"
        onClick={ () => setShowInput(!showInput) }
        data-testid="search-top-btn"
      >
        Search
      </button>
      {showInput && <input placeholder="Search" data-testid="search-input" />}
    </header>

  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
