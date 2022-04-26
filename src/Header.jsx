import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Header({ history, title }) {
  const [showInput, setShowInput] = useState(false);

  const redirectToProfile = () => {
    console.log(history);
    history.push('/profile');
  };

  const checkSearchInput = () => {
    if (showInput === false) {
      setShowInput(true);
    } else {
      setShowInput(false);
    }
  };

  return (
    <header>
      <button
        data-testid="profile-top-btn"
        type="button"
        onClick={ () => redirectToProfile() }
      >
        Profile
      </button>
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
