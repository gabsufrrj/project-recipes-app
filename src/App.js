import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Provider from './Context/Provider';
import FoodRecipes from './Páginas/FoodRecipes';
import Profile from './Páginas/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route path="/foods" render={ (props) => <FoodRecipes { ...props } /> } />
          <Route path="/profile" component={ Profile } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
