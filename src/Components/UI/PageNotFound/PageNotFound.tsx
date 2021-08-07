import React from "react";
import { useHistory } from "react-router-dom";
import classes from "./PageNotFound.module.css";

export default function PageNotFound() {
  const history = useHistory();
  const homeClickHandle = () => {
    history.push("/gl-shop/product");
  };
  return (
    <div className={classes["content"]}>
      <h5>Page not found</h5>
      <div className={classes["actions"]}>
        <button className={classes["button--alt"]} onClick={homeClickHandle}>
          Take me home !
        </button>
      </div>
    </div>
  );
}
