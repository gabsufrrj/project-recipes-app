import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Explore() {
  return (
    <div>
      <Header title="Explore" renderInput={ false } />
      <Link to="/explore/foods">
        <button data-testid="explore-foods" type="button">
          Explore Foods
        </button>
      </Link>
      <Link to="/explore/drinks">
        <button data-testid="explore-drinks" type="button">
          Explore Drinks
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Explore;
