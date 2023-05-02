import React from "react";
import Button from "../UI/Button/Button";
import classes from './MenuItem.module.css';

const MenuItem = (props) => {
    return(
    <li className={classes.meal}>
        <div>
        <h3>{props.name}</h3>
        <p className={classes.description}>{props.description}</p>
        <p className={classes.price}>{props.price}</p>
        </div>

        <div>
        <Button>Add to Cart</Button>
        </div>
    </li>
    );
    
};

export default MenuItem;