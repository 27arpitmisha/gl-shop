import { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import AvailableCartProduct from "./Components/Cart/AvailableCartProduct/AvailableCartProduct";
import Header from "./Components/Header/Header";
import AvailableItem from "./Components/Shopping/AvailableItem/AvailableProduct";
import ProductDetails from "./Components/Shopping/ProductDetail/ProductDetails";
import AvailableWishListProduct from "./Components/Shopping/WishList/AvailableWishListProduct";
import CartContext from "./Store/CartContext";
import CartProvider from "./Store/CartProvider";

function App() {
  const product = {
     id: "", name: "", description: "", image: "", price: 0 
  }

  const [showCart, setShowCart] = useState(false);
  const [showWishList, setShowWishList] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [productDetail, setProductDetail] = useState(product);


  const showCartHandler = () => {
    setShowCart(true);
  };
  const hideCarthandler = () => {
    setShowCart(false);
  };
  const showWishListHandler = () => {
    setShowWishList(true);
  };
  const hideWishListhandler = () => {
    setShowWishList(false);
  };
  const hideProductDetailhandler = () => {
    setShowProductDetails(false);
  };
  const getDetailsHandler = (
    product: any
  ) => {
    console.log(product);
    setProductDetail(product);
    setShowProductDetails(true);
  };
  return (
    <CartProvider>
      <Header
        onClick={showCartHandler}
        onClickWishList={showWishListHandler}
      ></Header>
      <AvailableItem onClick={getDetailsHandler}></AvailableItem>
      {showCart ? (
        <AvailableCartProduct onClick={hideCarthandler}></AvailableCartProduct>
      ) : (
        <></>
      )}
      {showWishList ? (
        <AvailableWishListProduct
          onClick={hideWishListhandler}
        ></AvailableWishListProduct>
      ) : (
        <></>
      )}
      {showProductDetails ? (
        <ProductDetails
          id={productDetail.id}
          name={productDetail.name}
          image={productDetail.image}
          price={productDetail.price}
          description={productDetail.description}
          onClick={hideProductDetailhandler}
        ></ProductDetails>
      ) : (
        <></>
      )}
    </CartProvider>
  );
}

export default App;
