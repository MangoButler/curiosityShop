import React from "react";

import Card from "../UI/Card/Card";
import MenuItem from "./MenuItem";
import classes from "./MenuList.module.css";


const MenuList = (props) =>{
    return(
    <Card className={classes.menu} >
        <h2>{props.title}</h2>
        <ul>
        {props.menuList.map((item) => (
          <MenuItem key={item.id} name={item.name} description={item.description} price={item.price} />
        ))}
      </ul>
    </Card>
    );

};

export default MenuList;