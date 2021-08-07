import { useContext, useEffect, useState } from "react";
import classes from "./AvailableCart.module.css";
import CartContext from "../../../Store/CartContext";
import Card from "../../UI/Cards/Card";
import CartItem from "../CartItem/CartItem";
import { useHistory } from "react-router-dom";

const AvailableCartProduct: React.FC = () => {
  const cartctx = useContext(CartContext);
  const history = useHistory();
  const hasItems = cartctx.items.length > 0;

  const addtoCartHandler = (product: any) => {
    cartctx.addItem({ ...product, amount: 1 });
  };

  const removefromCartHandler = (id: string) => {
    cartctx.removeItem(id);
  };

  const redirectToProductsHandle = () => {
    history.push("/gl-shop/product");
  };
  return (
    <div className={classes["backdrop"]}>
      <div className={classes["cart"]}>
        <Card>
          <div className={classes["cart-items"]}>
            <ul>
              {cartctx.items.map((product) => {
                return (
                  <CartItem
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    desciption={product.description}
                    price={product.price}
                    image={product.image}
                    amount={product.amount}
                    onAdd={addtoCartHandler.bind(null, product)}
                    onRemove={removefromCartHandler.bind(null, product.id)}
                  ></CartItem>
                );
              })}
              <div className={classes["total"]}>
                {hasItems ? <span>Total</span> : <h4>Cart is empty</h4>}
                <span>
                  ₹{Math.abs(parseFloat(cartctx.totalAmount.toFixed(2)))}
                </span>
              </div>
            </ul>
          </div>
          <div className={classes["actions"]}>
            <button
              className={classes["button--alt"]}
              onClick={redirectToProductsHandle}
            >
              Products
            </button>
            {hasItems && <button className={classes["button"]}>Order</button>}
          </div>
        </Card>
      </div>
    </div>
  );
};
export default AvailableCartProduct;
