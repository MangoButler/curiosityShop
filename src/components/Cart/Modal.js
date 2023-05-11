import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";
import Cart from "./Cart";
import Card from "../UI/Card/Card";
import cartContext from "../../store/shopping-cart-context";
import Button from "../UI/Button/Button";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onResolve} />;
};
const ModalOverlay = (props) => {
  const cartCtx = useContext(cartContext);
  return (
    <Card className={classes.modal}>
      {cartCtx.currentItems.length > 0 && <Cart onResolve={props.onResolve} />}
      {cartCtx.currentItems.length === 0 && !cartCtx.placedOrder &&<h2>Nothing here yet</h2>}
      {cartCtx.currentItems.length === 0 && !cartCtx.placedOrder &&(
        <Button onClick={props.onResolve}>Go back</Button>
      )}
      {cartCtx.currentItems.length === 0 && cartCtx.placedOrder &&<h2>Order placed</h2>}
    </Card>
  );
};
const Modal = (props) => {
//   const [placeOrder, setPlacedOrder] = useState(false);
//   const afterOrderHandler = () =>{
//     setPlacedOrder(prevState => !prevState);
//   };
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onResolve={props.onResolve} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onResolve={props.onResolve}
          title={props.title}
          message={props.message}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default Modal;
