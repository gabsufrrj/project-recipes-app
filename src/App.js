import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './Context/Provider';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/"><Login /></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
