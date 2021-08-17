import React, { useContext, useState } from "react";

import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `€${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddhandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  };

  const orderHandler = () => {
    setShowCheckout(true);
  };

  const cancelCheckout = () => {
    setShowCheckout(false);
  };

  const submitOrderHandler = (userData) => {
    fetch("https://react-food-order-ba806-default-rtdb.europe-west1.firebasedatabase.app/orders.json", {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  };

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

  const modalActions = (
    <div className={classes.actions}>
      <Button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </Button>
      {hasItems && (
        <Button className={classes.button} onClick={orderHandler}>
          Order
        </Button>
      )}
    </div>
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
          {showCheckout && (
            <Checkout
              onConfirm={submitOrderHandler}
              onCancel={cancelCheckout}
            />
          )}
          {!showCheckout && modalActions}
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
