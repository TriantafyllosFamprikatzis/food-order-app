import React from "react";
import Modal from "../UI/Modal/Modal";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {[{ id: "c1", name: "susi", amount: "2", price: "12.99" }].map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onClose} items={cartItems}>
      <div className={classes.modal}>
        <div className={classes.content}>
          {props.items}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>35.62</span>
          </div>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>
              Close
            </button>
            <button className={classes.button}>Order</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
