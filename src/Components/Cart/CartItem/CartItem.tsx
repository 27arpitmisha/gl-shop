import { FC } from "react";
import classes from "./CartItem.module.css";

interface Product {
  key: string;
  id: string;
  name: string;
  desciption: string;
  price: number;
  amount: number;
  image: string;
  onAdd: any;
  onRemove: any;
}

const CartItem: FC<Product> = ({
  amount,
  name,
  price,
  image,
  onAdd,
  onRemove,
}) => {
  return (
    <div>
      <li className={classes["cart-item"]}>
        <div>
          <img src={image}></img>
          <h2>{name}</h2>
          <div className={classes.summary}>
            <span className={classes.price}>₹ {price}</span>
            <span className={classes.amount}>x {amount}</span>
          </div>
        </div>
        <div className={classes.actions}>
          <button onClick={onRemove}>−</button>
          <button onClick={onAdd}>+</button>
        </div>
      </li>
    </div>
  );
};

export default CartItem;
