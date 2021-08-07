import React, { Fragment, useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Card from "../../UI/Cards/Card";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./ProductDetail.module.css";

interface ParamTypes {
  productId: string;
}

interface product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}
const ProductDetails = () => {
  const param = useParams<ParamTypes>();
  const [productDetail, setProductDetail] = useState<product>();
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  const id = param.productId;

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
      const productID = availProducts.findIndex((product: any) => {
        if (product.id === id) {
          return product.id;
        }
      });
      const product = availProducts[productID];
      setProductDetail({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
      });
      setError(false);
      setLoading(false);
    }
    fetchItems().catch((error) => {
      setError(true);
    });
  }, []);
  const backtoProducts = () => {
    history.push("/gl-shop/product");
  };
  return (
    <div className={classes["backdrop"]}>
      <div className={classes["cart"]}>
        <Card>
          <Fragment>
            {error ? (
              <h5>Something not right</h5>
            ) : isLoading ? (
              <Spinner></Spinner>
            ) : (
              <Fragment>
                <div className={classes["item"]}>
                  <img src={productDetail?.image} alt={productDetail?.name} />
                  <div className={classes["detail"]}>
                    <h3>{productDetail?.name}</h3>
                    <div className={classes["description"]}>
                      {productDetail?.description}
                    </div>
                    <div className={classes["price"]}>
                      ₹{productDetail?.price}
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </Fragment>
          <div className={classes["actions"]}>
            <button className={classes["button--alt"]} onClick={backtoProducts}>
              Back
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default ProductDetails;
