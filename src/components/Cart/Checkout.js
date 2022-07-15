import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (val) => !val.trim();
const fiveCharsLong = (val) => val.trim().length === 5;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const confirmHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    setFormInputsValidity({
      name: !isEmpty(enteredName),
      street: !isEmpty(enteredStreet),
      postal: fiveCharsLong(enteredPostal),
      city: !isEmpty(enteredCity),
    });

    const formIsValid =
      !isEmpty(enteredName) &&
      !isEmpty(enteredStreet) &&
      !isEmpty(enteredCity) &&
      fiveCharsLong(enteredPostal);

    if (!formIsValid) return;

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
  };

  const determineClasses = (inputVal) => {
    return inputVal
      ? `${classes.control}`
      : `${classes.control} ${classes.invalid}`;
  };
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={determineClasses(formInputsValidity.name)}>
        <label htmlFor="name">Your name</label>
        <input id="name" type="text" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={determineClasses(formInputsValidity.street)}>
        <label htmlFor="street">Street</label>
        <input id="street" type="text" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={determineClasses(formInputsValidity.postal)}>
        <label htmlFor="postal">Postal code</label>
        <input id="postal" type="text" ref={postalInputRef} />
        {!formInputsValidity.postal && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={determineClasses(formInputsValidity.city)}>
        <label htmlFor="city">City</label>
        <input id="city" type="text" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default Checkout;
