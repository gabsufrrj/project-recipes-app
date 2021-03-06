import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import DoneAndFavoriteRecipesFilterButtons from
'../Components/DoneAndFavoriteRecipesFilterButtons';
import RenderFavoriteRecipes from '../Components/RenderFavoriteRecipes';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import '../CSS/DoneAndFavoriteRecipesFilterButtons.css';
import '../CSS/FavoriteRecipes.css';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('all');
  const [filteredFavoriteRecipes, setFilteredFavoriteRecipes] = useState([]);

  useEffect(() => {
    const getFilteredFavoriteRecipes = () => {
      const favoriteRecipes = getFromLocalStorage('favoriteRecipes', []);
      const filterFavoriteRecipes = (filter === 'all')
        ? favoriteRecipes : favoriteRecipes.filter((e) => e.type === filter);
      setFilteredFavoriteRecipes(filterFavoriteRecipes);
    };
    getFilteredFavoriteRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div>
      <Header title="Favorite Recipes" renderInput={ false } />
      <section className="favorite-recipes-content">
        <div className="favorite-recipes-background">
          <span style={ { display: 'none' } }>BACKGROUND</span>
        </div>
        <DoneAndFavoriteRecipesFilterButtons filter={ filter } setFilter={ setFilter } />
        <RenderFavoriteRecipes
          filteredFavoriteRecipes={ filteredFavoriteRecipes }
          filter={ filter }
          setFilteredFavoriteRecipes={ setFilteredFavoriteRecipes }
        />
      </section>
    </div>
  );
}

export default FavoriteRecipes;
