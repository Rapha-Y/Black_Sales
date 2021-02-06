import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import AuthLoading from './components/Auth/AuthLoading';
import Home from './components/Main/Home/Home';
import ProductPage from './components/Main/ProductPage/ProductPage';
import Profile from './components/Main/Profile/Profile';
import Announce from './components/Main/Announce/Announce';
import Purchases from './components/Main/Purchases/Purchases';
import Cart from './components/Main/Cart/Cart';
import DefaultLoading from './components/Main/DefaultLoading';
import NotFound from './components/Main/NotFound/NotFound';

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