import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Provider from './Context/Provider';
import FoodRecipes from './pages/FoodRecipes';
import DrinkRecipes from './pages/DrinkRecipes';
import Profile from './pages/Profile';
import Login from './pages/Login';
import DetailsFoodRecipes from './pages/DetailsFoodRecipes';
import DetailsDrinkRecipes from './pages/DetailsDrinkRecipes';
import ProgressFoodRecipes from './pages/ProgressFoodRecipes';
import ProgressDrinkRecipes from './pages/ProgressDrinkRecipes';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import ExploreFoodByIngredients from './pages/ExploreFoodByIngredients';
import ExploreDrinkByIngredients from './pages/ExploreDrinkByIngredients';
import ExploreFoodNationalities from './pages/ExploreFoodNationalities';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ FoodRecipes } />
          <Route exact path="/drinks" component={ DrinkRecipes } />
          <Route exact path="/foods/:id" component={ DetailsFoodRecipes } />
          <Route exact path="/drinks/:id" component={ DetailsDrinkRecipes } />
          <Route exact path="/foods/:id/in-progress" component={ ProgressFoodRecipes } />
          <Route exact path="/drink/:id/in-progress" component={ ProgressDrinkRecipes } />
          <Route exact path="/explore" component={ Explore } />
          <Route exact path="/explore/foods" component={ ExploreFood } />
          <Route exact path="/explore/drinks" component={ ExploreDrink } />
          <Route
            exact
            path="/explore/foods/ingredients"
            component={ ExploreFoodByIngredients }
          />
          <Route
            exact
            path="/explore/drinks/ingredients"
            component={ ExploreDrinkByIngredients }
          />
          <Route
            exact
            path="/explore/foods/nationalities"
            component={ ExploreFoodNationalities }
          />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/explore/drinks/nationalities" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
