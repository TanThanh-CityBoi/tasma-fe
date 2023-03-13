import React, { Fragment } from 'react';
import NormalizeStyles from './NormalizeStyles';
import BaseStyles from './BaseStyles';
// import Toast from './Toast';
import Routes from './Routes';
import './fontStyles.css';

const App = () => (
  <Fragment>
    <NormalizeStyles />
    <BaseStyles />
    {/* <Toast /> */}
    <Routes />
  </Fragment>
);

export default App;
