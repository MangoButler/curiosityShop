import React, { useContext, useEffect, useState } from "react";
import cartContext from "../../store/shopping-cart-context";
import Modal from "../Cart/Modal";
import Button from "../UI/Button/Button";
import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(cartContext);
  const [viewCart, setViewCart] = useState(false);
  const [highlightButton, setHighlightButton] = useState(false);
  const buttonClasses = `${classes.button} ${highlightButton ? classes.bump : ''}`;


  const { currentItems } =   cartCtx;

  const numberOfCartItems = currentItems.reduce((currentNumber, item) =>{
    return currentNumber + item.amount;
  }, 0);

  useEffect(() =>{
    if(currentItems.length === 0){
        return;
    }
    setHighlightButton(true);

    const timer = setTimeout(()=>{
        setHighlightButton(false);
    }, 300);

    return () => {
        clearTimeout(timer);
    }
  }, [currentItems])


  const onViewCart = () => {
    console.log(cartCtx.currentItems.length);
    setViewCart(true);
  };
  const onCloseCart = () => {
    setViewCart(false);
    cartCtx.setPlacedOrder(false);
  };

  return (
    <React.Fragment>
      {viewCart && <Modal onResolve={onCloseCart} />}
      <Button className={buttonClasses} onClick={onViewCart}>
        <span className={classes.icon}><CartIcon className={classes.icon} /></span>
        <span>{props.children}</span>
        <span className={classes.badge}>
          {numberOfCartItems}
        </span>
      </Button>
    </React.Fragment>
  );
};

export default HeaderCartButton;
