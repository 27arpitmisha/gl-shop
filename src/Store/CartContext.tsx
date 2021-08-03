import React from 'react';
const product = {
    id : '',
    name : '',
    description: '',
    price : 0,
    amount:0,
    image : '',
  }
  const wlProduct = {
    id : '',
    name : '',
    price : 0,
    image : '',
  }  
const CartContext = React.createContext({
    items : [product],
    wishList :[wlProduct],
    totalAmount: 0,
    addItem : ({})=>{},
    addItemWishList : ({})=>{},
    removeItemWishList : (id :string)=>{},
    removeItem : (id:string)=>{},
    replaceCart : ({})=>{},
});

export default CartContext;