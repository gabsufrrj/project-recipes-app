import React, { useState } from 'react';
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
      const favoriteRecipes = getFromLocalStorage('favoriteRecipes', []);
      const filterFavoriteRecipes = (filter === 'all')
        ? favoriteRecipes : favoriteRecipes.filter((e) => e.type === filter);
      setFilteredDoneRecipes(filterFavoriteRecipes);
    };
    getFilteredFavoriteRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
