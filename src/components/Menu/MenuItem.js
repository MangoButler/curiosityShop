import React from "react";

import classes from './MenuItem.module.css';
import MenuItemForm from "./MenuItemForm";

const MenuItem = (props) => {
    return(
    <li className={classes.meal}>
        <div>
        <h3>{props.name}</h3>
        <p className={classes.description}>{props.description}</p>
        <p className={classes.price}>{props.price}</p>
        </div>

        <MenuItemForm name={props.name} description={props.description} price={props.price} />
    </li>
    );
    
};

export default MenuItem;