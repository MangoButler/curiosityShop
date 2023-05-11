import React from "react";
import classes from './Header.module.css';
import mainImage from '../images/olga-antonenko-antique-shop-sketch.jpeg';
import HeaderCartButton from "./HeaderCartButton";


const Header = (props) =>{
    return (
        <React.Fragment>
        <header className={classes.header}>
            <h1>Curiosity Shop</h1>
            <HeaderCartButton>See Cart</HeaderCartButton>
        </header>
        <img className={classes['main-image']} src={mainImage} alt='Meals'/>
        </React.Fragment>
    );
   
};

export default Header;
