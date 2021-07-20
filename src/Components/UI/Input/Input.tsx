import React, {Ref, useRef} from 'react'
import classes from "./Input.module.css";

interface AuxProps {
  id :string
}

const Input = React.forwardRef<HTMLInputElement,AuxProps>((props, ref) => {  
  return (
    <div className={classes["input"]}>
      <label>{}</label>
      <input 
      id={props.id}   
      ref = {ref}         
      defaultValue = '1' 
      type='number' 
      ></input>
    </div>
  );
});
export default Input;
