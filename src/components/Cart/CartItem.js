import classes from './CartItem.module.css';

const CartItem = (props) => {
  // const price = `$${props.price.toFixed(2)}`;
  const onAdd = () =>{
    props.onAdd({name: props.name, description:props.description, price:props.price, amount: 1});
  };
  const onRemove = () =>{
    props.onRemove({name: props.name, description:props.description, price:props.price, amount: -1});
  };

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{props.price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
