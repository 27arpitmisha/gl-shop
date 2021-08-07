import { Fragment, useContext, useEffect, useState } from "react";

import { Switch, Redirect, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import AvailableCartProduct from "./Components/Cart/AvailableCartProduct/AvailableCartProduct";
import Header from "./Components/Header/Header";
import AvailableItem from "./Components/Shopping/AvailableItem/AvailableProduct";
import ProductDetails from "./Components/Shopping/ProductDetail/ProductDetails";
import AvailableWishListProduct from "./Components/Shopping/WishList/AvailableWishListProduct";
import PageNotFound from "./Components/UI/PageNotFound/PageNotFound";
import CartContext from "./Store/CartContext";


let initial = true;
function App() {
  const product = {
    id: "",
    name: "",
    description: "",
    image: "",
    price: 0,
  };

  const [showWishList, setShowWishList] = useState(false);
  const [cartErrorMsg, setcartError] = useState(false);
  const cartctx = useContext(CartContext);

  const showWishListHandler = () => {
    setShowWishList(true);
  };
  const hideWishListhandler = () => {
    setShowWishList(false);
  };

  useEffect(() => {
    async function sendDataToCart() {    
      if (initial) {
        initial = false;
        return;
      }
      const response = await fetch(
        "https://shop-1a145-default-rtdb.firebaseio.com/Cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cartctx.items,
            totalAmount: cartctx.totalAmount,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something not right while adding to cart");
      }
      setcartError(false);
    }
    sendDataToCart().catch((error) => {
      setcartError(true);

      setTimeout(() => {
        setcartError(false);
      }, 1000);
    });
  }, [cartctx.items]);

  useEffect(() => {
    async function fetchItems() {    
      const response = await fetch(
        "https://shop-1a145-default-rtdb.firebaseio.com/Cart.json"
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }

      const dataArr = await response.json();
      let availProducts = [];
      for (let key in dataArr.items) {
        availProducts.push({          
          id: dataArr.items[key].id,
          amount: dataArr.items[key].amount,
          name: dataArr.items[key].name,
          description: dataArr.items[key].description,
          price: dataArr.items[key].price,
          image: dataArr.items[key].image,
        });
      }
      cartctx.replaceCart({
        cartProducts: [...availProducts],
        totalAmount: dataArr.totalAmount,
      });

      setcartError(false);
    }
    fetchItems().catch((error) => {
      setcartError(true);

      setTimeout(() => {
        setcartError(false);
      }, 1000);
    });
  }, []);

  return (
    <Fragment>
      <Header onClickWishList={showWishListHandler}></Header>   
      <Switch>      
        <Route path="/" exact>
          <Redirect to="/gl-shop/product" />
        </Route>
        <Route path="/gl-shop" exact>
          <Redirect to="/gl-shop/product" />
        </Route>
        <Route path="/gl-shop/product" exact>         
          <AvailableItem></AvailableItem>
        </Route>
        <Route path="/gl-shop/product/:productId">
          <ProductDetails></ProductDetails>
        </Route>
        <Route path="/gl-shop/cart">
          <AvailableCartProduct></AvailableCartProduct>
        </Route>    
        <Route path='*' exact={true} component={PageNotFound}></Route>    
      </Switch>
      {showWishList ? (
        <AvailableWishListProduct
          onClick={hideWishListhandler}
        ></AvailableWishListProduct>
      ) : (
        <></>
      )}
   </Fragment>
  );
}

export default App;
