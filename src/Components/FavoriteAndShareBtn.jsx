import React, { useEffect, useState, useContext } from 'react';
import recipesContext from '../Context/MyContext';

function FavoriteAndShareBtn() {
  const whiteHeartIcon = '../images/whiteHeartIcon.svg';
  const blackHeartIcon = '../images/blackHeartIcon.svg';
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
      <button
        data-testid="share-btn"
        type="button"
        onClick={ favoriteItem }
        src="../images/shareIcon.svg"
      >
        <img
          alt="share"
          src="../images/shareIcon.svg"
        />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ favoriteItem }
        src={ favoriteIcon }
        alt="favorite"
      >
        <img
          alt="favorite"
          src={ favoriteIcon }
        />
      </button>
    </div>
  );
}

export default FavoriteAndShareBtn;
