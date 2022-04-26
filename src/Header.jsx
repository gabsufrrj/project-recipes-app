import React from 'react';

function Header() {
  return (
    <header>
      <button data-testid="profile-top-btn" type="button">
        Profile
      </button>
      <h1 data-testid="page-title">
        Title
      </h1>
      <button data-testid="search-top-btn" type="button">
        Search
      </button>
    </header>

  );
}

export default Header;
