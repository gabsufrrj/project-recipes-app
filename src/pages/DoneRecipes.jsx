import React from 'react';
import Header from '../Components/Header';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import shareImage from '../images/shareIcon.svg';

function DoneRecipes() {
  const renderDoneRecipes = () => {
    const getDoneRecipes = getFromLocalStorage('doneRecipes', []);
    return (
      getDoneRecipes.map((e, index) => (
        <div key={ e.name }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ e.image }
            alt={ e.name }
          />
          <h3 data-testid={ `${index}-horizontal-top-text` }>{e.category}</h3>
          <h2 data-testid={ `${index}-horizontal-name` }>{e.name}</h2>
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
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareImage }
            alt="Share"
          />
        </div>
      ))
    );
  };

  return (
    <div>
      <Header title="Done Recipes" renderInput={ false } />
      <div>
        <button type="button" data-testid="filter-by-all-btn">
          All
        </button>
        <button type="button" data-testid="filter-by-food-btn">
          Food
        </button>
        <button type="button" data-testid="filter-by-drink-btn">
          Drinks
        </button>
      </div>
      {renderDoneRecipes()}
    </div>
  );
}

export default DoneRecipes;
