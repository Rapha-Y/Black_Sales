import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProductPage from './components/ProductPage';
import Announce from './components/Announce';
import Profile from './components/Profile';
import Cart from './components/Cart';
import Purchases from './components/Purchases';

function App() {
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  async function isAuth() {
    try {
      const response = await fetch(
        'http://localhost:5000/auth/is-verify',
        {
          method: 'GET',
          headers: {
            token: localStorage.token
          }
        }
      );

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

      setIsReady(true);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    isAuth();
  });

  return (
    <Fragment>
      <Router>
        <Switch>
          <Route 
            exact path='/' 
            render={
              props => <Home {...props} isReady={isReady} isAuth={isAuthenticated} />
            } 
          />
          <Route 
            exact path='/login' 
            render={
              props =>
                isReady ? 
                (
                  !isAuthenticated ? 
                  <Login {...props} setAuth={setAuth} /> :
                  <Redirect to='/' />
                ) :
                <div>Loader placeholder</div>
            } 
          />
          <Route 
            exact path='/register' 
            render={
              props =>
                isReady ? 
                (
                  !isAuthenticated ? 
                  <Register {...props} setAuth={setAuth} /> :
                  <Redirect to='/' />
                ) :
                <div>Loader placeholder</div>
            } 
          />
          <Route 
            exact path='/product/:id' 
            render={
              props => <ProductPage {...props} isReady={isReady} isAuth={isAuthenticated} />
            } 
          />
          <Route 
            exact path='/cart' 
            render={
              props => 
                isReady ? 
                (
                  isAuthenticated ? 
                  <Cart {...props} isReady={isReady} isAuth={isAuthenticated}/> : 
                  <Redirect to='/login' />
                ) :
                <div>Loader placeholder</div>
            } 
          />
          <Route
            exact path='/profile'
            render={
              props => 
                isReady ? 
                (
                  isAuthenticated ?
                  <Profile {...props} isReady={isReady} isAuth={isAuthenticated} setAuth={setAuth} /> :
                  <Redirect to='/login' />
                ) :
                <div>Loader placeholder</div>
            }
          />
          <Route
            exact path='/announce'
            render={
              props => 
                isReady ?
                (
                  isAuthenticated ?
                  <Announce {...props} isReady={isReady} isAuth={isAuthenticated} /> :
                  <Redirect to='/login' />
                ) :
                <div>Loader placeholder</div>
            }
          />
          <Route
            exact path='/purchases'
            render={
              props => 
                isReady ? 
                (
                  isAuthenticated ?
                  <Purchases {...props} isReady={isReady} isAuth={isAuthenticated} /> :
                  <Redirect to='/login' />
                ) :
                <div>Loader placeholder</div>
            }
          />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;