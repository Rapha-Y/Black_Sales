import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AuthLoading from './components/Auth/AuthLoading';
import Home from './components/Home';
import ProductPage from './components/ProductPage';
import Announce from './components/Announce';
import Profile from './components/Profile';
import Cart from './components/Cart';
import Purchases from './components/Purchases';
import DefaultLoading from './components/DefaultLoading';
import NotFound from './components/NotFound';

toast.configure();

function App() {
  //state to check if user has been identified as valid or invalid already
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  // verifies if user is logged in
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
                <AuthLoading />
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
                <AuthLoading />
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
                <DefaultLoading />
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
                <DefaultLoading />
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
                <DefaultLoading />
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
                <DefaultLoading />
            }
          />
          <Route 
            path='/'
            render={
              props => 
                isReady ?
                (
                  <NotFound {...props} isReady={isReady} isAuth={isAuthenticated} />
                ) :
                <DefaultLoading />
            }
          />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;