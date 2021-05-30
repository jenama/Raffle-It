import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import './App.css';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path={'/'}>
             <Home/>
          </Route>
        </Switch>
       
    </div>
  );
}

export default App;
