import classes from "./HeaderCart.module.css";
import CartIcon from "../../UI/CartIcon";
import React, { MouseEventHandler, useContext } from "react";
import CartContext from '../../../Store/CartContext'
interface AuxProp{
  onClick : ()=>{}
}

const HeaderCart : React.FC<AuxProp> = ({onClick}) => { 
   const context = useContext(CartContext);   
   const numberOfCartItems = context.items.reduce((curNumber, item)=>{    
    return curNumber + item.amount;
  },  0)
  
  return (
   <button className={classes['button']} onClick={onClick} >
   <span className={classes['icon']}><CartIcon></CartIcon></span>
   <span>Check Cart</span>
   <span className = {classes['badge']}>{numberOfCartItems}</span>
   </button>
  );
};

export default HeaderCart;
