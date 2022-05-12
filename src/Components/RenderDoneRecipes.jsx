import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareImage from '../images/shareIcon.svg';

let timer;

function RenderDoneRecipes({ filteredDoneRecipes }) {
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

  return (
    <section className="done-recipes-section">
      {filteredDoneRecipes.map((e, index) => (
        <div key={ `done-recipe-${index}` } className="done-recipe-card">
          <div className="done-recipe-title-div">
            <Link to={ `/${e.type}s/${e.id}` }>
              <h2 data-testid={ `${index}-horizontal-name` }>{e.name}</h2>
            </Link>
            <Link to={ `/${e.type}s/${e.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ e.image }
                alt={ e.name }
                className="done-recipe-image"
              />
            </Link>
          </div>
          <div className="done-recipe-info">
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              {(e.type === 'food') ? (
                `${e.nationality} - ${e.category}`) : `${e.alcoholicOrNot}`}
            </h3>
            <h4>
              <span>Done in: </span>
              <span data-testid={ `${index}-horizontal-done-date` }>{e.doneDate}</span>
            </h4>
            <div className="tags-div">
              {e.tags.map((tag) => (
                <span
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  key={ tag }
                >
                  {tag}
                </span>))}
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
      ))}
      {(!filteredDoneRecipes.length) && <h2>Done Recipes not found!</h2>}
    </section>
  );
}

export default RenderDoneRecipes;

RenderDoneRecipes.propTypes = {
  filteredDoneRecipes: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
};
