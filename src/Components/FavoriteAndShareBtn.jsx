import React, { useEffect, useState, useContext } from 'react';
import recipesContext from '../Context/MyContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteAndShareBtn() {
  /* const whiteHeartIcon = '../images/whiteHeartIcon.svg';
  const blackHeartIcon = '../images/blackHeartIcon.svg'; */
  const [favoriteIcon, setFavoriteIcon] = useState(whiteHeartIcon);
  const { id } = useContext(recipesContext);
  useEffect(() => {
    const checkFavoriteRecipe = () => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes !== null) {
        favoriteRecipes.forEach((element) => {
          if (element.id === id) {
            setFavoriteIcon(blackHeartIcon);
          }
        });
      }
    };
    checkFavoriteRecipe();
  }, []);

  const favoriteItem = () => {
    if (favoriteIcon === whiteHeartIcon) {
      setFavoriteIcon(blackHeartIcon);
    } else {
      setFavoriteIcon(whiteHeartIcon);
    }
  };

  return (
    <div>
      <input
        data-testid="share-btn"
        type="image"
        src={ shareIcon }
        alt="share"
      />
      <input
        data-testid="favorite-btn"
        type="image"
        onClick={ favoriteItem }
        src={ favoriteIcon }
        alt="favorite"
      />
    </div>
  );
}

export default FavoriteAndShareBtn;
