import React, { Fragment, MouseEventHandler, useContext } from "react";
import HeaderCart from "./HeaderCartButton/HeaderCart.button";

import classes from "./Header.module.css";
import HeaderwishList from "./HeaderWishListButton/HeaderWishList.button";
import { useHistory } from "react-router-dom";

interface AuxProp {
  onClickWishList: any;
}

const Header: React.FC<AuxProp> = ({ onClickWishList }) => {
  const history = useHistory();
  const logoClickHandle = ()=>{
    history.push("/gl-shop/product");
  }
  return (
    <Fragment>
      <header className={classes["header"]}>
        <h3 onClick={logoClickHandle}>Globallogic Shop</h3>
        <div className={classes["HeaderButtons"]}>
          <HeaderwishList onClick={onClickWishList}></HeaderwishList>
          <HeaderCart></HeaderCart>
        </div>
      </header>
    </Fragment>
  );
};
export default Header;
