import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Provider from './Context/Provider';
import FoodRecipes from './pages/FoodRecipes';
import Profile from './pages/Profile';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/"><Login /></Route>
          <Route path="/foods" component={ FoodRecipes } />
          <Route path="/profile" component={ Profile } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
