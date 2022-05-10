import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import DoneAndFavoriteRecipesFilterButtons from
'../Components/DoneAndFavoriteRecipesFilterButtons';
import RenderDoneRecipes from '../Components/RenderDoneRecipes';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import '../CSS/DoneRecipes.css';

function DoneRecipes() {
  const [filter, setFilter] = useState('all');
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);

  useEffect(() => {
    const getFilteredFavoriteRecipes = () => {
      const doneRecipes = getFromLocalStorage('doneRecipes', []);
      const filterDoneRecipes = (filter === 'all')
        ? doneRecipes : doneRecipes.filter((e) => e.type === filter);
      setFilteredDoneRecipes(filterDoneRecipes);
    };
    getFilteredFavoriteRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div>
      <Header title="Done Recipes" renderInput={ false } />
      <DoneAndFavoriteRecipesFilterButtons filter={ filter } setFilter={ setFilter } />
      <RenderDoneRecipes filteredDoneRecipes={ filteredDoneRecipes } />
    </div>
  );
}

export default DoneRecipes;
