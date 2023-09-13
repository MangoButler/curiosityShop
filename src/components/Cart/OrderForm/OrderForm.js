import { useContext } from "react";
import classes from "./OrderForm.module.css";
import cartContext from "../../../store/shopping-cart-context";
import useInput from "../../../hooks/use-input";
import useRequest from "../../../hooks/use-request";
import validateEmail from "../../../store/validateEmail";
import validatePlace from "../../../store/isCity";

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

  const {
    value: cityValue,
    valueIsValid: cityValid,
    hasError: cityHasError,
    valueChangeHandler: cityValueChangeHandler,
    inputBlurHandler: cityBlurrHandler,
    reset: cityReset,
  } = useInput(validatePlace);

  const {
    value: countryValue,
    valueIsValid: countryValid,
    hasError: countryHasError,
    valueChangeHandler: countryValueChangeHandler,
    inputBlurHandler: countryBlurrHandler,
    reset: countryReset,
  } = useInput(validatePlace.bind(null, null));

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

  const cityInputClasses = cityHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const countryInputClasses = countryHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  let formIsValid = false;

  if (
    firstNameValid &&
    lastNameValid &&
    emailValid &&
    addressValid &&
    cityValid &&
    countryValid
  ) {
    formIsValid = true;
  }

  const requestConfig = {
    url: "https://react-http-48ff4-default-rtdb.firebaseio.com/orders.json",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      address: addressValue,
      city: cityValue,
      country: countryValue,
      order: cartCtx.currentItems,
      timestamp: new Date().toString()
    },
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    const response = await sendRequest(requestConfig, (data) => {
      return data;
    });
    // console.log(response);
    if (!response) {
      return;
    }
    cartCtx.onPlaceOrder();
    firstNameReset();
    lastNameReset();
    emailReset();
    addressReset();
    cityReset();
    countryReset();
  };

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
        <h2>Personal Details:</h2> 
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
            <p className={classes.errorText}>First Name cannot be empty</p>
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
            <p className={classes.errorText}>Last Name cannot be empty</p>
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
          {emailHasError && (
            <p className={classes.errorText}>Provide valid email</p>
          )}
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
            <p className={classes.errorText}>Provide valid address</p>
          )}
        </div>
        <div className={classes.controlPair}>
          <div className={cityInputClasses}>
            <label htmlFor="name">City</label>
            <input
              type="text"
              id="name"
              value={cityValue}
              onChange={cityValueChangeHandler}
              onBlur={cityBlurrHandler}
            />
            {cityHasError && (
              <p className={classes.errorText}>City not found</p>
            )}
          </div>
          <div className={countryInputClasses}>
            <label htmlFor="name">Country</label>
            <input
              type="text"
              id="name"
              value={countryValue}
              onChange={countryValueChangeHandler}
              onBlur={countryBlurrHandler}
            />
            {countryHasError && (
              <p className={classes.errorText}>Country not found</p>
            )}
          </div>
        </div>
      </div>
      {error && <p className={classes.errorText}>{error}</p>}
      <div className={classes.actions}>
        <button
          type="submit"
          className={`${classes.button} ${classes.submit}`}
          disabled={!formIsValid || isLoading}
        >
          {!isLoading ? "Place Order" : "Sending..."}
        </button>
        <button onClick={props.onResolve} className={classes.button}>
          Go back
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
