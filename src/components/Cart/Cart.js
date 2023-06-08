import React, { useContext } from "react";
import cartContext from "../../store/shopping-cart-context";
import Button from "../UI/Button/Button";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(cartContext);
  const total = cartCtx.currentItems
    .map((i) => i.price.substring(1) * i.amount)
    .reduce((a, b) => a + b, 0);
  
  const onToCheckout = () => {
      cartCtx.setPlacedOrder(1);
  };  

  return (
    <React.Fragment>
      <ul className={classes.cartItems}>
        {cartCtx.currentItems.map((item) => (
          <CartItem
            key={Math.random()}
            name={item.name}
            description={item.description}
            price={item.price}
            amount={item.amount}
            onAdd={cartCtx.onAddItem}
            onRemove={cartCtx.onRemoveItem}
          />
        ))}
      </ul>
      <div className={classes.total}>
        <h2>{Math.floor(total)}$</h2>
        <div className={classes.actions}>
            <Button className={classes.button} onClick={onToCheckout}>
            Visit Checkout
          </Button>
          {/* <Button className={classes.button} onClick={cartCtx.onPlaceOrder}>
            Place Order
          </Button> */}
          <Button className={classes.button} onClick={props.onResolve}>
            Back to Menu
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cart;
