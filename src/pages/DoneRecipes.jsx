import React from 'react';
import Header from '../Components/Header';
import RenderDoneRecipes from '../Components/RenderDoneRecipes';

function DoneRecipes() {
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
      <RenderDoneRecipes />
    </div>
  );
}

export default DoneRecipes;
