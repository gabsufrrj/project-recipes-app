import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import DoneAndFavoriteRecipesFilterButtons from
'../Components/DoneAndFavoriteRecipesFilterButtons';
import RenderFavoriteRecipes from '../Components/RenderFavoriteRecipes';
import getFromLocalStorage from '../helpers/getFromLocalStorage';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('all');
  const [filteredFavoriteRecipes, setFilteredFavoriteRecipes] = useState([]);

  useEffect(() => {
    const favoriteRecipes = getFromLocalStorage('favoriteRecipes', []);
    const filterFavoriteRecipes = (filter === 'all')
      ? favoriteRecipes : favoriteRecipes.filter((e) => e.type === filter);
    setFilteredFavoriteRecipes(filterFavoriteRecipes);
  }, [filter]);

  return (
    <div>
      <Header title="Favorite Recipes" renderInput={ false } />
      <section>
        <DoneAndFavoriteRecipesFilterButtons setFilter={ setFilter } />
        <RenderFavoriteRecipes filteredFavoriteRecipes={ filteredFavoriteRecipes } />
      </section>
    </div>
  );
}

export default FavoriteRecipes;
