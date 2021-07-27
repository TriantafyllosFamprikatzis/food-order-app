import React from 'react';

import mealsImage from '../meals.jpg';
import classes from './Header.module.css';

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="Meals"></img>
      </div>
    </div>
  );
};

export default Header;