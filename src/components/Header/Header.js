import React from "react";
import Button from "../UI/Button/Button";
import classes from './Header.module.css';
import mainImage from '../images/meals.jpg';


const Header = (props) =>{
    return (
        <React.Fragment>
        <header className={classes.header}>
            <h1>Curiosity Shop</h1>
            <Button>Your Cart</Button>
        </header>
        <img className={classes['main-image']} src={mainImage} alt='Meals'/>
        </React.Fragment>
    );
   
};

export default Header;
