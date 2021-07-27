import React, { Fragment } from 'react';

import Header from './Header/Header';
import MealsSummary from './Meals/MealsSummary';

function App() {
  return (
    <Fragment>
      <Header />
      <MealsSummary />
    </Fragment>
  );
}

export default App;
