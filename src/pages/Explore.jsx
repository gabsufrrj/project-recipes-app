import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../CSS/Explore.css';

function Explore() {
  return (
    <div>
      <Header title="Explore" renderInput={ false } />
      <section className="explore-section">
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
      </section>
      <Footer />
    </div>
  );
}

export default Explore;
