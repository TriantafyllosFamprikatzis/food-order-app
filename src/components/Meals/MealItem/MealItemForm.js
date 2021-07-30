import React from "react";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  return (
    <form className={classes.form}>
      <Input label="Amount" input={{
        id: "amount_" + props.id,
        type: "number",
        min: "1",
        max: "5",
        step: "1",
        defaultValue: "1"
      }}/>
      <Button className={classes.button}>+ Add</Button>
    </form>
  );
};

export default MealItemForm;
