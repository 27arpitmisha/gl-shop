import React, { useContext, useState } from "react";
import classes from "./Product.module.css";
import ShoppingForm from "./ShoppingItemForm";
import CartContext from "../../../Store/CartContext";
import { useHistory } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}
interface ProductData {
  key: string;
  singleProduct: Product;
}

const Product: React.FC<ProductData> = ({ singleProduct }) => {
  const [wishListStatus, setwishListStatus] = useState(false);
  const ctxCart = useContext(CartContext);
  const history = useHistory();

  const manageWishListHandle = () => {
    setwishListStatus(!wishListStatus);
    if (!wishListStatus) {
      ctxCart.addItemWishList({
        id: singleProduct.id,
        name: singleProduct.name,
        price: singleProduct.price,
        image: singleProduct.image,
      });
    } else {
      ctxCart.removeItemWishList(singleProduct.id);
    }
  };
  const sendProductHandler = () => {
    history.push(`/gl-shop/product/${singleProduct.id}`);
  };
  const addToCarthandle = (numOfItem: number) => {
    ctxCart.addItem({
      id: singleProduct.id,
      name: singleProduct.name,
      description: singleProduct.description,
      price: singleProduct.price,
      image: singleProduct.image,
      amount: numOfItem,
    });
  };
  return (
    <li className={classes["shop"]}>
      <div className={classes["item"]}>
        <img
          src={singleProduct.image}
          alt={singleProduct.name}
          onClick={sendProductHandler}
        />
        <div className={classes["detail"]}>
          <h3>{singleProduct.name}</h3>
          <div className={classes["description"]}>
            {singleProduct.description}
          </div>
          <div className={classes["price"]}>₹{singleProduct.price}</div>
        </div>
      </div>
      <div>
        {
          <ShoppingForm
            id={singleProduct.id}
            onClick={addToCarthandle}
            onWishListClick={manageWishListHandle}
            wishListStatus={wishListStatus}
          />
        }
      </div>
    </li>
  );
};
export default Product;
