import React from 'react';
import HeaderCartButton from './HeaderCartButton';
// images can be simply imported
import mealsImage from '../../assets/meals.jpg';
// the extension matters (except from js files) because it tells the build process that this is not a Javascript file and
// therefore to inject it appropriately behind the scenes
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <React.Fragment>
      {/* header - default HTML5 element */}
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        {/* since it is a class with a dash inside its name, we can't use the dot
        notation */}
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </React.Fragment>
  );
};

export default Header;
