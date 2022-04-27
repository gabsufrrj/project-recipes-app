import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header({ title }) {
  const [showInput, setShowInput] = useState(false);

  const checkSearchInput = () => {
    if (showInput === false) {
      setShowInput(true);
    } else {
      setShowInput(false);
    }
  };

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
      <h1 data-testid="page-title">
        { title }
      </h1>

      <button
        data-testid="search-top-btn"
        type="button"
        onClick={ () => checkSearchInput() }
      >
        Search
      </button>
      {showInput && <input placeholder="Search" data-testid="search-input" />}
    </header>

  );
}

Header.defaultProps = {
  history: undefined,
};

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  title: PropTypes.string.isRequired,
};
export default Header;
