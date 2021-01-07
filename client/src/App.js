import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';

function App() {
  return (
    <Fragment>
      <Home /><hr />
      <Login /><hr />
      <Register /><hr />
      <Profile /><hr />
      <ProductPage id={2} /><hr />
      <Cart />
    </Fragment>
  );
}

export default App;
