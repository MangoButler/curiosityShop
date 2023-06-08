import React, { useState, useContext, useRef } from "react";
import cartContext from "../../store/shopping-cart-context";
import Button from "../UI/Button/Button";
import classes from './MenuItemForm.module.css';


const MenuItemForm = (props) =>{
    const cartCtx = useContext(cartContext);

    const inputRef = useRef();
    const [enteredAmount, setEnteredAmount] = useState('');
    
    const inputChangeHandler = (event) =>{
        setEnteredAmount(event.target.value);
    };

    const submitHandler = (event)=> {
        event.preventDefault();
        // if(enteredAmount > 0){
        //     cartCtx.onAddItem({...props, amount: +enteredAmount});
        //     setEnteredAmount('');
        //     console.log(cartCtx.currentItems); 
        // }
        if(inputRef.current.value > 0){
            cartCtx.onAddItem({...props, amount: +inputRef.current.value});
            inputRef.current.value = '';
            // console.log(cartCtx.currentItems);
        }else if(inputRef.current.value < 0){
            cartCtx.onRemoveItem({...props, amount: +inputRef.current.value});
            inputRef.current.value = '';
            // console.log(cartCtx.currentItems);
        }

    };



    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <div className={classes.inputWrapper}>
                <input type='number' name="amount" id={props.key} ref={inputRef}  onChange={inputChangeHandler} />
                <label htmlFor={props.key}>Select Amount</label>
            </div>

            
            {!parseFloat(enteredAmount) && <Button type='submit' disabled='disabled' className={classes.button} >Add to Cart</Button>}
            {enteredAmount > 0 && <Button type='submit' className={classes.button}>Add to Cart</Button>}
            {enteredAmount < 0 && <Button type='submit' className={classes.button}>Remove</Button>}

            
        </form>
    )

};

export default MenuItemForm;