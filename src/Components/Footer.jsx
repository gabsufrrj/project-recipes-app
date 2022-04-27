import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <input
          type="image"
          data-testid="drinks-bottom-btn"
          src="../images/drinkIcon.svg"
          alt="drinks"
        />
      </Link>
      <Link to="/explore">
        <input
          type="image"
          data-testid="explore-bottom-btn"
          src="../images/exploreIcon.svg"
          alt="explore"
        />
      </Link>
      <Link to="/foods">
        <input
          type="image"
          data-testid="food-bottom-btn"
          src="../images/mealIcon.svg"
          alt="foods"
        />
      </Link>
    </footer>
  );
}

export default Footer;
