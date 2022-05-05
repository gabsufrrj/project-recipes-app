import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <input
          type="image"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drinks"
        />
      </Link>
      <Link to="/explore">
        <input
          type="image"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explore"
        />
      </Link>
      <Link to="/foods">
        <input
          type="image"
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="foods"
        />
      </Link>
    </footer>
  );
}

export default Footer;
