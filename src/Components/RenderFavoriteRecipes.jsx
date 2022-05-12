import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareImage from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import getFromLocalStorage from '../helpers/getFromLocalStorage';

let timer;

function RenderFavoriteRecipes(props) {
  const { filteredFavoriteRecipes, filter, setFilteredFavoriteRecipes } = props;

  const share = (target, recipe) => {
    const number1 = 1;
    const number3000 = 3000;
    const linkCopiedClass = '.link-copied';
    const url = window.location.href.split('/').slice(0, -number1).join('/');
    navigator.clipboard.writeText(`${url}/${recipe.type}s/${recipe.id}`);
    clearTimeout(timer);
    document.querySelectorAll(linkCopiedClass).forEach((e) => {
      e.style.display = 'none';
    });
    target.parentElement.querySelector(linkCopiedClass).style.display = 'inline';
    timer = setTimeout(() => {
      target.parentElement.querySelector(linkCopiedClass).style.display = 'none';
    }, number3000);
  };

  const dislike = (receita) => {
    let favoriteRecipes = getFromLocalStorage('favoriteRecipes', []);
    favoriteRecipes = favoriteRecipes.filter((e) => e.name !== receita.name);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    setFilteredFavoriteRecipes((filter === 'all')
      ? favoriteRecipes : favoriteRecipes.filter((e) => e.type === filter));
  };

  return (
    <section className="favorite-recipes-section">
      {filteredFavoriteRecipes.map((e, index) => (
        <div key={ e.name } className="favorite-recipe-card">
          <Link to={ `/${e.type}s/${e.id}` } className="favorite-recipe-link">
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ e.image }
              alt={ e.name }
              className="favorite-recipe-image"
            />
          </Link>
          <div className="favorite-recipe-info">
            <div>
              <h3 data-testid={ `${index}-horizontal-top-text` }>
                {(e.type === 'food') ? (
                  `${e.nationality} - ${e.category}`) : `${e.alcoholicOrNot}`}
              </h3>
              <Link to={ `/${e.type}s/${e.id}` }>
                <h2 data-testid={ `${index}-horizontal-name` }>{e.name}</h2>
              </Link>
            </div>
            <div className="favorite-share-div">
              <div>
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="Favorite_Image"
                  onClick={ () => dislike(e) }
                  aria-hidden="true"
                />
              </div>
              <div className="share-div">
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareImage }
                  alt="Share"
                  onClick={ ({ target }) => share(target, e) }
                  aria-hidden="true"
                />
                <span className="link-copied">Link copied!</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {(!filteredFavoriteRecipes.length) && (
        <h2 className="favorite-recipes-not-found">Favorite Recipes not found!</h2>)}
    </section>
  );
}

export default RenderFavoriteRecipes;

RenderFavoriteRecipes.propTypes = {
  filteredFavoriteRecipes: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  filter: PropTypes.string.isRequired,
  setFilteredFavoriteRecipes: PropTypes.func.isRequired,
};
