import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </AppProvider>
  );
}

export default App;
