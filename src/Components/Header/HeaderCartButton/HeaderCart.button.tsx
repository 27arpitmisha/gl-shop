import classes from "./HeaderCart.module.css";
import CartIcon from "../../UI/CartIcon";
import React, { MouseEventHandler, useContext } from "react";
import CartContext from "../../../Store/CartContext";
import { useHistory } from "react-router-dom";

const HeaderCart: React.FC = () => {
  const context = useContext(CartContext);
  const history = useHistory();
  const numberOfCartItems = context.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const cartClickHandle = () => {
    history.push("/gl-shop/cart");
  };
  return (
    <button className={classes["button"]} onClick={cartClickHandle}>
      <span className={classes["icon"]}>
        <CartIcon></CartIcon>
      </span>
      <span>Check Cart</span>
      <span className={classes["badge"]}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCart;
