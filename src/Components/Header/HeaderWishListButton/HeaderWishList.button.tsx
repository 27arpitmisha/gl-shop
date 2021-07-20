import classes from "./HeaderWishList.module.css";
import React, { MouseEventHandler, useContext } from "react";
import { AiFillHeart } from "react-icons/ai";
import CartContext from "../../../Store/CartContext";
interface AuxProp {
  onClick: () => {};
}

const HeaderwishList: React.FC<AuxProp> = ({ onClick }) => {
  const wishListCtx = useContext(CartContext);
  const hasItem = wishListCtx.wishList.length > 0;
  return (
    <button className={classes["button"]} onClick={onClick}>
      <span>Wish List </span>
      <span className={classes["icon"]}>
        <AiFillHeart size="1.5em" color={hasItem ?"red":"grey"}></AiFillHeart>
      </span>
    </button>
  );
};

export default HeaderwishList;
