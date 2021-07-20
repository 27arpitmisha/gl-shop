import React, { Fragment, MouseEventHandler, useContext } from "react";
import HeaderCart from "./HeaderCartButton/HeaderCart.button";
import BannerImage from "../../Assets/banner2.png";
import classes from "./Header.module.css";
import HeaderwishList from "./HeaderWishListButton/HeaderWishList.button";

interface AuxProp {
  onClick: any;
  onClickWishList: any;
}

const Header: React.FC<AuxProp> = ({ onClick, onClickWishList }) => {
  return (
    <Fragment>
      <header className={classes["header"]}>
        <h3>Globallogic Shop</h3>
        <div className={classes["HeaderButtons"]}>
          <HeaderwishList onClick={onClickWishList}></HeaderwishList>
          <HeaderCart onClick={onClick}></HeaderCart>
        </div>
      </header>
      <div className={classes["main-image"]}>
        <img src={BannerImage} />
      </div>
    </Fragment>
  );
};
export default Header;
