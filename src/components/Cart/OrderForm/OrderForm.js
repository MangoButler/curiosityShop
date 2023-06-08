import { useContext } from "react";
import classes from "./OrderForm.module.css";
import cartContext from "../../../store/shopping-cart-context";
import useInput from "../../../hooks/use-input";
import useRequest from "../../../hooks/use-request";
import validateEmail from "../../../store/validateEmail";

const isNotEmpty = (value) => value.trim() !== "";

const OrderForm = (props) => {
  const cartCtx = useContext(cartContext);
  const { isLoading, error, sendRequest } = useRequest();

  const {
    value: firstNameValue,
    valueIsValid: firstNameValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameValueChangeHandler,
    inputBlurHandler: firstNameBlurrHandler,
    reset: firstNameReset,
  } = useInput(isNotEmpty);

  const {
    value: lastNameValue,
    valueIsValid: lastNameValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameValueChangeHandler,
    inputBlurHandler: lastNameBlurrHandler,
    reset: lastNameReset,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    valueIsValid: emailValid,
    hasError: emailHasError,
    valueChangeHandler: emailValueChangeHandler,
    inputBlurHandler: emailBlurrHandler,
    reset: emailReset,
  } = useInput(validateEmail);

  const {
    value: addressValue,
    valueIsValid: addressValid,
    hasError: addressHasError,
    valueChangeHandler: addressValueChangeHandler,
    inputBlurHandler: addressBlurrHandler,
    reset: addressReset,
  } = useInput(isNotEmpty);

  const firstNameInputClasses = firstNameHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const lastNameInputClasses = lastNameHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const emailInputClasses = emailHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const addressInputClasses = addressHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  let formIsValid = false;

  if (firstNameValid && lastNameValid && emailValid && addressValid) {
    formIsValid = true;
  }

  const requestConfig = {
    url: 'https://react-http-48ff4-default-rtdb.firebaseio.com/orders.jsonl',
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      address: addressValue,
      order: cartCtx.currentItems,
    },
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    const response = await sendRequest(requestConfig, (data)=> {return data});
    console.log(response);
    if(!response){
        return;
    };
    cartCtx.onPlaceOrder();
    firstNameReset();
    lastNameReset();
    emailReset();
    addressReset();
  };

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.controlGroup}>
        <div className={firstNameInputClasses}>
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            value={firstNameValue}
            onChange={firstNameValueChangeHandler}
            onBlur={firstNameBlurrHandler}
          />
          {firstNameHasError && (
            <p className="error-text">First Name cannot be empty</p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            value={lastNameValue}
            onChange={lastNameValueChangeHandler}
            onBlur={lastNameBlurrHandler}
          />
          {lastNameHasError && (
            <p className="error-text">Last Name cannot be empty</p>
          )}
        </div>
        <div className={emailInputClasses}>
          <label htmlFor="name">E-Mail Address</label>
          <input
            type="email"
            id="name"
            value={emailValue}
            onChange={emailValueChangeHandler}
            onBlur={emailBlurrHandler}
          />
          {emailHasError && <p className="error-text">Provide valid email</p>}
        </div>
        <div className={addressInputClasses}>
          <label htmlFor="name">Address</label>
          <input
            type="text"
            id="name"
            value={addressValue}
            onChange={addressValueChangeHandler}
            onBlur={addressBlurrHandler}
          />
          {addressHasError && (
            <p className="error-text">Provide valid address</p>
          )}
        </div>
      </div>

      <div className={classes.actions}>
        {isLoading && <p>Loading...</p>}
        {error && <p className={classes.errorText}>{error.message}</p>}
        
        <button
          type="submit"
          className={classes.button}
          disabled={!formIsValid}
        >
          Place Order
        </button>
        <button onClick={props.onResolve}>Go back</button>
      </div>
    </form>
  );
};

export default OrderForm;
