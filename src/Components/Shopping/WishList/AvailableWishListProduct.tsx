import React, { useContext, useState } from "react";
import CartContext from "../../../Store/CartContext";
import Card from "../../UI/Cards/Card";
import WishListItem from "./WishListItem";
import classes from './AvailableWishListProduct.module.css'

interface AuxProp {
  onClick : any  
}
const AvailableWishListProduct : React.FC<AuxProp> = ({onClick}) => {
  const wishListCtx = useContext(CartContext);
  const hasData = wishListCtx.wishList.length > 0;
    
  return (    
    <div className={classes["backdrop"]}>
    <div className={classes["wList"]}>
        <Card>
        <div className={classes["wList-items"]}>       
            <ul>
              {wishListCtx.wishList.map((product: any) => {
                return (
                  <WishListItem
                    key = {product.id}
                    id={product.id}
                    name={product.name}                    
                    image = {product.image}
                    price = {product.price}
                    description = {product.description}                                        
                  ></WishListItem>
                );
              })}
            </ul>
            {!hasData ? <h4>Wish List is empty</h4> : ''}
          </div>
          <div className={classes["actions"]}>
            <button className={classes["button-alt"]} onClick={onClick}>
              Cancel
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default AvailableWishListProduct;
