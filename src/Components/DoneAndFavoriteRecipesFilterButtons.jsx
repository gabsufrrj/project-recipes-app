import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/DoneAndFavoriteRecipesFilterButtons.css';

function DoneAndFavoriteRecipesFilterButtons({ filter, setFilter }) {
  return (
    <nav className="done-recipes-filter-buttons">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        className={ (filter === 'all') ? 'selected' : null }
        onClick={ () => setFilter('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        className={ (filter === 'food') ? 'selected' : null }
        onClick={ () => setFilter('food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        className={ (filter === 'drink') ? 'selected' : null }
        onClick={ () => setFilter('drink') }
      >
        Drinks
      </button>
    </nav>
  );
}

export default DoneAndFavoriteRecipesFilterButtons;

DoneAndFavoriteRecipesFilterButtons.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};
