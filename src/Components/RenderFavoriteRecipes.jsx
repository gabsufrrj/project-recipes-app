import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareImage from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import getFromLocalStorage from '../helpers/getFromLocalStorage';

function RenderFavoriteRecipes(props) {
  const { filteredFavoriteRecipes, filter, setFilteredFavoriteRecipes } = props;

  const share = (target, recipe) => {
    const number1 = 1;
    const url = window.location.href.split('/').slice(0, -number1).join('/');
    navigator.clipboard.writeText(`${url}/${recipe.type}s/${recipe.id}`);
    document.querySelectorAll('.link-copied').forEach((e) => { e.innerHTML = ''; });
    console.log();
    target.parentElement.querySelector('.link-copied').innerHTML = 'Link copied!';
  };

  const dislike = (receita) => {
    let favoriteRecipes = getFromLocalStorage('favoriteRecipes', []);
    favoriteRecipes = favoriteRecipes.filter((e) => e.name !== receita.name);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    setFilteredFavoriteRecipes((filter === 'all')
      ? favoriteRecipes : favoriteRecipes.filter((e) => e.type === filter));
  };

  return (
    <div className="favorite-recipes">
      {filteredFavoriteRecipes.map((e, index) => (
        <div key={ e.name }>
          <Link to={ `/${e.type}s/${e.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ e.image }
              alt={ e.name }
              className="favorite-recipe-image"
            />
          </Link>
          <h3 data-testid={ `${index}-horizontal-top-text` }>
            {(e.type === 'food') ? (
              `${e.nationality} - ${e.category}`) : `${e.alcoholicOrNot}`}
          </h3>
          <Link to={ `/${e.type}s/${e.id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{e.name}</h2>
          </Link>
          <div>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareImage }
              alt="Share"
              onClick={ ({ target }) => share(target, e) }
              aria-hidden="true"
            />
            <span className="link-copied">{`${''}`}</span>
          </div>
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt="Favorite_Image"
            onClick={ () => dislike(e) }
            aria-hidden="true"
          />
        </div>
      ))}
    </div>
  );
}

export default RenderFavoriteRecipes;

RenderFavoriteRecipes.propTypes = {
  filteredFavoriteRecipes: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  filter: PropTypes.string.isRequired,
  setFilteredFavoriteRecipes: PropTypes.func.isRequired,
};
