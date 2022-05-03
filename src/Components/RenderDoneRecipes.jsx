import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareImage from '../images/shareIcon.svg';

function RenderDoneRecipes({ filteredDoneRecipes }) {
  const share = (target, recipe) => {
    const number1 = 1;
    const url = window.location.href.split('/').slice(0, -number1).join('/');
    navigator.clipboard.writeText(`${url}/${recipe.type}s/${recipe.id}`);
    document.querySelectorAll('.link-copied').forEach((e) => { e.innerHTML = ''; });
    console.log();
    target.parentElement.querySelector('.link-copied').innerHTML = 'Link copied!';
  };

  return (
    <div className="done-recipes">
      {filteredDoneRecipes.map((e, index) => (
        <div key={ e.name }>
          <Link to={ `/${e.type}s/${e.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ e.image }
              alt={ e.name }
              className="done-recipe-image"
            />
          </Link>
          <h3 data-testid={ `${index}-horizontal-top-text` }>
            {(e.type === 'food') ? (
              `${e.nationality} - ${e.category}`) : `${e.alcoholicOrNot}`}
          </h3>
          <Link to={ `/${e.type}s/${e.id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{e.name}</h2>
          </Link>
          <h4>
            <span>Done in:</span>
            <span data-testid={ `${index}-horizontal-done-date` }>{e.doneDate}</span>
          </h4>
          <div>
            {e.tags.map((tag) => (
              <span
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ tag }
              >
                {tag}
              </span>))}
          </div>
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
        </div>
      ))}
    </div>
  );
}

export default RenderDoneRecipes;

RenderDoneRecipes.propTypes = {
  filteredDoneRecipes: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
};
