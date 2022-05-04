import React, { useEffect, useState } from 'react';
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
    const doneRecipes = getFromLocalStorage('doneRecipes', []);
    const filterDoneRecipes = (filter === 'all')
      ? doneRecipes : doneRecipes.filter((e) => e.type === filter);
    setFilteredDoneRecipes(filterDoneRecipes);
  }, [filter]);

  return (
    <div>
      <Header title="Done Recipes" renderInput={ false } />
      <section className="done-recipes-section">
        <DoneAndFavoriteRecipesFilterButtons setFilter={ setFilter } />
        <RenderDoneRecipes filteredDoneRecipes={ filteredDoneRecipes } />
      </section>
    </div>
  );
}

export default DoneRecipes;
