import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../CSS/ExploreFoods.css';

function ExploreFood() {
  const [randomId, setRandomId] = useState('');

  const randomFetchMeal = async () => {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const json = await request.json();
    const result = json.meals[0].idMeal;
    setRandomId(result);
  };

  useEffect(() => {
    randomFetchMeal();
  }, []);

  return (
    <div>
      <Header title="Explore Foods" renderInput={ false } />
      <section className="explore-foods-section">
        <Link to="/explore/foods/ingredients">
          <button data-testid="explore-by-ingredient" type="button">
            By Ingredient
          </button>
        </Link>
        <Link to="/explore/foods/nationalities">
          <button data-testid="explore-by-nationality" type="button">
            By Nationality
          </button>
        </Link>
        <Link to={ `/foods/${randomId}` }>
          <button data-testid="explore-surprise" type="button">
            Surprise me!
          </button>
        </Link>
      </section>
      <Footer />
    </div>
  );
}

export default ExploreFood;
