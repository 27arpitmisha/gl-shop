import React from "react";
import Card from "../../UI/Cards/Card";
import classes from "./ProductDetail.module.css";

interface AuxProp {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  onClick : any
}
const ProductDetails: React.FC<AuxProp> = ({
  id,
  name,
  description,
  image,
  price,
  onClick
}) => {
  return (
    <div className={classes["backdrop"]}>
      <div className={classes["cart"]}>
      <Card>
      <div className={classes["item"]}>
        <img src={image} alt={name} />
        <div className={classes["detail"]}>
          <h3>{name}</h3>
          <div className={classes["description"]}>{description}</div>
          <div className={classes["price"]}>₹{price}</div>
        </div>
      </div>
      <div className={classes["actions"]}>
            <button className={classes["button--alt"]} onClick={onClick} >
              Cancel
            </button>           
          </div>
      </Card> 
      </div>
    </div>
  );
};
export default ProductDetails;
