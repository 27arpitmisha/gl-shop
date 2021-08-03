import React, { useContext, useEffect, useState } from "react";
import classes from "./AvailableProduct.module.css";
import Card from "../../UI/Cards/Card";
import Spinner from "../../UI/Spinner/Spinner";
import Product from "../Product/Product";
import CartContext from "../../../Store/CartContext";
interface AuxProps {
  onClick: any;
}
let initial = true;
const AvailableItem: React.FC<AuxProps> = ({ onClick }) => {
  const [errorMsg, setError] = useState(false);
  const [cartErrorMsg, setcartError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const cartctx = useContext(CartContext);
  const [allProducts, setProducts] = useState([
    { id: "", name: "", price: 0, description: "", image: "" },
  ]);
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
      setLoading(true);
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
          id: key,
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

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      const response = await fetch(
        "https://shop-1a145-default-rtdb.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      const dataArr = await response.json();
      let availProducts = [];
      for (let key in dataArr) {
        availProducts.push({
          id: key,
          name: dataArr[key].name,
          description: dataArr[key].description,
          price: dataArr[key].price,
          image: dataArr[key].image,
        });
      }
      setProducts(availProducts);
      setError(false);
      setLoading(false);
    }
    fetchItems().catch((error) => {
      setError(true);
    });
  }, []);

  return (
    <section className={classes["shops"]}>
      {cartErrorMsg && <p>Couldnt to added to cart</p>}
      <ul>
        {errorMsg ? (
          <h3 className={classes["error"]}>Something went wrong! </h3>
        ) : isLoading ? (
          <Spinner></Spinner>
        ) : (
          <Card>
            {allProducts.map((product) => {
              return (
                <Product
                  key={product.id}
                  singleProduct={product}
                  onClick={onClick}
                ></Product>
              );
            })}
          </Card>
        )}
      </ul>
    </section>
  );
};
export default AvailableItem;
