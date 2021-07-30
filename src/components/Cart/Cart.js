import React, { useContext } from "react";

import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `€${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {};
  const cartItemAddhandler = (item) => {};

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddhandler.bind(null, item)}
          />
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onClose}>
      <div className={classes.modal}>
        <div className={classes.content}>
          {props.items}
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <Button className={classes["button--alt"]} onClick={props.onClose}>
              Close
            </Button>
            {hasItems && <Button className={classes.button}>Order</Button>}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
