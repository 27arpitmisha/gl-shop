
import React, { ReactElement } from "react";
import classes from "./Card.module.css";

interface AuxProps {
  children: ReactElement | ReactElement[]
}
const Card = ({ children }: AuxProps) => {
  return <div className={classes["card"]}  >{children}</div>;
};

export default Card;