import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../Context/MyContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteAndShareBtn({ type }) {
  const [favoriteIcon, setFavoriteIcon] = useState(whiteHeartIcon);
  const [showMessage, setShowMessage] = useState(false);
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

  const favoriteItem = async () => {
    if (favoriteIcon === whiteHeartIcon) {
      setFavoriteIcon(blackHeartIcon);
    } else {
      setFavoriteIcon(whiteHeartIcon);
    }
    if (type === 'food') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const result = await response.json();
      const food = result.meals[0];
      const favorite = [{ id: food.idMeal,
        type: 'food',
        nationality: food.strArea,
        category: food.strCategory,
        alcoholicOrNot: '',
        name: food.strMeal,
        image: food.strMealThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
    } else {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const result = await response.json();
      const drink = result.drinks[0];
      console.log(drink);
      const favorite = [{ id: drink.idDrink,
        type: 'drink',
        nationality: '',
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
    }

    // setFoodDetails(result.meals[0]);
  };

  const copyUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setShowMessage(true);
  };

  return (
    <div>
      <input
        data-testid="share-btn"
        type="image"
        src={ shareIcon }
        alt="share"
        onClick={ copyUrl }
      />
      {showMessage && <span>Link copied!</span>}
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

FavoriteAndShareBtn.propTypes = {
  type: PropTypes.string.isRequired,
};

export default FavoriteAndShareBtn;
