import { useReducer, ReactElement } from "react";
import CartContext from "./CartContext";

interface AuxProps {
  children: ReactElement | ReactElement[];
}

const defaultState = {
  items: [],
  totalAmount: 0,
};
const wishListdefaultState = {
  wishListProduct: [],
};
const wishListReducer = (state: any, action: any) => {
  if (action.type === "ADD") {
    const existingWishListID = state.wishListProduct.findIndex(
      (product: any) => {
        if (product.id === action.item.id) {
          return product.id;
        }
      }
    );
    let updatedList;
    if (existingWishListID >= 0) {
      updatedList = [...state.wishListProduct];
    } else {
      updatedList = state.wishListProduct.concat(action.item);
    }
    return { wishListProduct: updatedList };
  }
  if (action.type === "REMOVE") {
    const updatedList = state.wishListProduct.filter(
      (product: any) => product.id !== action.id
    );
    return {wishListProduct : updatedList}
  }
  return { wishListProduct: [] };
};

const reducer = (state: any, action: any) => {

  if (action.type === 'REPLACE_CART'){    
    const intialCartItems = action.product.cartProducts; 
    return {
      items: intialCartItems,
      totalAmount: action.product.totalAmount
    };   
  }

  if (action.type === "ADD") {
    const updatedAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingProductID = state.items.findIndex((product: any) => {
      if (product.id === action.item.id) {
        return product.id;
      }
    });
    let updatedCartItem;
    const existingProduct = state.items[existingProductID];
    if (existingProductID >= 0) {
      const updateProduct = {
        ...existingProduct,
        amount: state.items[existingProductID].amount + action.item.amount,
      };
      updatedCartItem = [...state.items];
      updatedCartItem[existingProductID] = updateProduct;
    } else {
      updatedCartItem = state.items.concat(action.item);
    }
    return {
      items: updatedCartItem,
      totalAmount: updatedAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingProductID = state.items.findIndex((item: any) => {
      if (item.id === action.id) {
        return item;
      }
    });
    const existingProduct = state.items[existingProductID];
    const updatedAmount = state.totalAmount - existingProduct.price;
    let UpdatedProducts;
    if (existingProduct.amount === 1) {      
      UpdatedProducts = state.items.filter(
        (product: any) => product.id !== action.id
      );
    } else {
      console.log(state.items[existingProductID].amount);
      state.items[existingProductID].amount =
        state.items[existingProductID].amount - 1;
      UpdatedProducts = [...state.items];
    }
    return {
      items: UpdatedProducts,
      totalAmount: updatedAmount,
    };
  }
  return defaultState;
};
const CartProvider = ({ children }: AuxProps) => {
  const [cartState, dispatch] = useReducer(reducer, defaultState);
  const [wishLitState, dispatchWishList] = useReducer(
    wishListReducer,
    wishListdefaultState
  );
  const addItemHandler = (product: any) => {
    dispatch({ type: "ADD", item: product });
  };

  const removeItemHandler = (id: string) => {
    dispatch({ type: "REMOVE", id: id });
  };

  const addWishListItemHandler = (product: any) => {
    dispatch({ type: "ADD", item: product });
  };

  const removeWishListItemHandler = (id: string) => {     
    dispatch({ type: "REMOVE", id: id });
  };

  const replaceCartHandler  = (product : any) =>{    
    dispatch({ type: "REPLACE_CART", product: product });
  }

  const cartContext = {
    items: cartState.items,
    wishList: wishLitState.wishListProduct,
    totalAmount: cartState.totalAmount,
    addItemWishList: addWishListItemHandler,
    removeItemWishList: removeWishListItemHandler,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    replaceCart : replaceCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
