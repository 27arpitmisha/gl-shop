import React, { useRef, useState } from "react";
import Input from "../../UI/Input/Input";
import classes from "./ShoppingForm.module.css";
import { AiFillHeart } from "react-icons/ai";

interface AuxProp {
  id: string;
  onClick: any;
  onWishListClick: any;
  wishListStatus: boolean;
}

const ShoppingForm: React.FC<AuxProp> = ({
  id,
  onClick,
  onWishListClick,
  wishListStatus,
}) => {
  const inputAmount = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const addProductHandle = (event: any) => {
    event.preventDefault();
    if (inputAmount.current) {
      const numofItems = inputAmount.current.valueAsNumber;
      if (numofItems <= 0 || isNaN(numofItems) || numofItems > 5) {
        setError(true);
      } else {
        onClick(numofItems);
        setError(false);
      }
    }
  };
  return (
    <form className={classes["form"]}>
      <Input id={id} ref={inputAmount}></Input>
      {error ? <p>Input is inValid </p> : ""}
      <button onClick={addProductHandle}> + ADD </button>
      <AiFillHeart
        size="1.5em"
        color={wishListStatus ? "red" : "grey"}
        onClick={onWishListClick}
      ></AiFillHeart>
    </form>
  );
};
export default ShoppingForm;
