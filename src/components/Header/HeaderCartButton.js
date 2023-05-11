import React, { useContext, useState } from "react";
import cartContext from "../../store/shopping-cart-context";
import Modal from "../Cart/Modal";
import Button from "../UI/Button/Button";
import CartIcon from "./CartIcon";
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) =>{
    const cartCtx = useContext(cartContext);
    const [viewCart, setViewCart] = useState(false);

    const onViewCart = () =>{
        console.log(cartCtx.currentItems.length);
        setViewCart(true);

    };
    const onCloseCart = () =>{
        setViewCart(false);
        cartCtx.setPlacedOrder(false);
    };
    

    return (
        <React.Fragment>
        {viewCart && (<Modal onResolve={onCloseCart}/>)}
        <Button className={classes.button} onClick={onViewCart}><span className={classes.badge}>{cartCtx.currentItems.length} <CartIcon className={classes.icon}/></span><span>{props.children}</span></Button>
        </React.Fragment>
    )
};

export default HeaderCartButton;