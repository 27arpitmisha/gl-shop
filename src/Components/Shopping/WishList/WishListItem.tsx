import { FC, useContext } from "react";
import classes from './WishList.module.css';
import CartContext from "../../../Store/CartContext";
interface Product {
  key: string;
  id: string;
  name: string;
  price: number;
  description:string;
  image: string;
}
const WishListItem: React.FC<Product> = ({id, name, description,image, price }) => {
  
  const cartCtx = useContext(CartContext);
  const addToCart = ()=>{    
    cartCtx.addItem({
      id: id,
      name: name,
      description: description,
      price: price,
      image: image,
      amount: 1
    });
  }
  
  return (
    <div>
      <li className={classes["wList-item"]}>
        <div>
          <img src={image}></img>
          <h2>{name}</h2>
          <div className={classes['amount']}>
            <span>₹ {price}</span>
          </div>
        </div>
        <div>
          <button onClick={addToCart}>+ Cart</button>
        </div>
      </li>
    </div>
  );
};
export default WishListItem;
