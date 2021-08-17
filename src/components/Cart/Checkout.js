import Button from "../UI/Button/Button";
import useInput from "../../assets/hooks/use-input";

import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    onChangeHandler: onChangeNameHandler,
    onBlurHandler: onBlurNameHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    onChangeHandler: onChangeStreetHandler,
    onBlurHandler: onBlurStreetHandler,
    reset: resetStreet,
  } = useInput(isNotEmpty);

  const {
    value: postalValue,
    isValid: postalIsValid,
    hasError: postalHasError,
    onChangeHandler: onChangePostalHandler,
    onBlurHandler: onBlurPostalHandler,
    reset: resetPostal,
  } = useInput(isFiveChars);

  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    onChangeHandler: onChangeCityHandler,
    onBlurHandler: onBlurCityHandler,
    reset: resetCity,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (nameIsValid && streetIsValid && postalIsValid && cityIsValid) {
    formIsValid = true;
  }

  if (nameIsValid) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    resetName();
    resetPostal();
    resetStreet();
    resetCity();

    props.onConfirm({
      name: nameValue,
      street: streetValue,
      postal: postalValue,
      city: cityValue,
    });
  };

  const nameInputClasses = nameHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const streetInputClasses = streetHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const postalInputClasses = postalHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const cityInputClasses = cityHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  return (
    <form onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameValue}
          onChange={onChangeNameHandler}
          onBlur={onBlurNameHandler}
        />
        {nameHasError && (
          <p className={classes.invalid}>Please enter a valid name!</p>
        )}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={streetValue}
          onChange={onChangeStreetHandler}
          onBlur={onBlurStreetHandler}
        />
        {streetHasError && (
          <p className={classes.invalid}>Please enter a valid street!</p>
        )}
      </div>
      <div className={postalInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalValue}
          onChange={onChangePostalHandler}
          onBlur={onBlurPostalHandler}
        />
        {postalHasError && (
          <p className={classes.invalid}>
            Please enter a valid postal code (5 characters long)!
          </p>
        )}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={cityValue}
          onChange={onChangeCityHandler}
          onBlur={onBlurCityHandler}
        />
        {cityHasError && (
          <p className={classes.invalid}>Please enter a valid city!</p>
        )}
      </div>
      <div className={classes.actions}>
        <Button onClick={props.onCancel}>Cancel</Button>
        <Button type="submit" className={classes.submit}>
          Confirm
        </Button>
      </div>
    </form>
  );
};

export default Checkout;