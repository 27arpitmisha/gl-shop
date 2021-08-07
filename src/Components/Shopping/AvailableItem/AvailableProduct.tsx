import React, { Fragment, useContext, useEffect, useState } from "react";
import classes from "./AvailableProduct.module.css";
import Card from "../../UI/Cards/Card";
import Spinner from "../../UI/Spinner/Spinner";
import Product from "../Product/Product";
import CartContext from "../../../Store/CartContext";
import BannerImage from "../../../Assets/banner2.png";

const AvailableItem = () => {
  const [errorMsg, setError] = useState(false);  
  const [isLoading, setLoading] = useState(false);  
  const [allProducts, setProducts] = useState([
    { id: "", name: "", price: 0, description: "", image: "" },
  ]);
 
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
    <Fragment>
      <div className={classes["main-image"]}>
        <img src={BannerImage} />
      </div>
      <section className={classes["shops"]}>        
        <ul>
          {errorMsg ? (
            <h3 className={classes["error"]}>Something went wrong! </h3>
          ) : isLoading ? (
            <Spinner></Spinner>
          ) : (
            <Card>
              {allProducts.map((product) => {
                return (
                  <Product key={product.id} singleProduct={product}></Product>
                );
              })}
            </Card>
          )}
        </ul>
      </section>
    </Fragment>
  );
};
export default AvailableItem;
