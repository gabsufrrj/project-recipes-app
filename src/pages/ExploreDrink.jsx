import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../CSS/ExploreDrinks.css';

function ExploreDrink() {
  const [randomId, setRandomId] = useState('');

  const randomFetchDrink = async () => {
    const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const json = await request.json();
    const result = json.drinks[0].idDrink;
    setRandomId(result);
  };

  useEffect(() => {
    randomFetchDrink();
  }, []);

  // console.log(randomId);

  return (
    <div>
      <Header title="Explore Drinks" renderInput={ false } />
      <section className="explore-drinks-section">
        <Link to="/explore/drinks/ingredients">
          <button data-testid="explore-by-ingredient" type="button">
            By Ingredient
          </button>
        </Link>
        <Link to={ `/drinks/${randomId}` }>
          <button data-testid="explore-surprise" type="button">
            Surprise me!
          </button>
        </Link>
      </section>
      <Footer />
    </div>
  );
}

export default ExploreDrink;
