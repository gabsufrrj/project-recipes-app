import React, { useEffect, useState, useContext } from 'react';
import '../CSS/StartRecipe.css';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import recipesContext from '../Context/MyContext';

function StartRecipe({ type }) {
  const [renderButton, setRenderButton] = useState(true);
  const [buttonText, setButtonText] = useState('Start Recipe');
  const { id } = useContext(recipesContext);
  const history = useHistory();
  useEffect(() => {
    const checkDoneRecipes = () => {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      if (doneRecipes !== null) {
        doneRecipes.forEach((element) => {
          if (element.id === id) {
            setRenderButton(false);
          }
        });
      }
    };
    const checkInProgressRecipes = () => {
      let inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (type === 'foods' && inProgress !== null) {
        inProgress = JSON.parse(localStorage.getItem('inProgressRecipes')).meals;
      } else if (inProgress !== null) {
        inProgress = JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails;
      }
      if (inProgress !== null
        && (inProgress[id] !== undefined)) {
        setButtonText('Continue Recipe');
      }
    };
    checkDoneRecipes();
    checkInProgressRecipes();
  }, []);

  const redirect = () => {
    history.push(`/${type}/${id}/in-progress`);
  };
  return (
    <div className="start-recipe-div">
      {renderButton && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="startRecipe"
          onClick={ redirect }
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

StartRecipe.propTypes = {
  type: PropTypes.string.isRequired,
};

export default StartRecipe;
