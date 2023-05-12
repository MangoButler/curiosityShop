import React from "react";
import Button from "../UI/Button/Button";
import classes from "./OrderConfirmation.module.css";

const OrderConfirmation = (props) => {
  return (
    <React.Fragment>
      <h2 className={classes.title}>Order Confirmed</h2>
      <p className={classes.text}>
        Thank you for your order from Curiosity Shop, where shadows whisper and
        secrets abound. Your order has been securely received and shall now be
        prepared with utmost discretion and fascination. To validate your order,
        we invite you to embark on a peculiar quest. Seek out the clandestine
        coordinates: [Latitude: 42.666, Longitude: -73.123]. There, in the
        depths of the hidden realm, you shall encounter a beggar known only as
        'James'. Approach him cautiously, for his knowledge holds the key to
        your order's fulfillment. Whisper the cryptic phrase, "In the shadows we
        trust," and he shall reveal the enigmatic path that lies ahead. Embrace
        this mysterious endeavor, for it is an integral part of the Curiosity
        Shop experience, where wonders await those brave enough to delve into
        the unknown. Keep your senses keen and your curiosity unyielding. Should
        queries arise or assistance be required, our discreet support operatives
        are at your disposal. Await the appointed hour, as the realm of secrets
        prepares to unveil its treasures. May anticipation guide your every
        step!
      </p>
      <q>Curiosity Shop</q> 
      <Button onClick={props.onResolve}>Back to shop</Button>
    </React.Fragment>
  );
};
export default OrderConfirmation;
