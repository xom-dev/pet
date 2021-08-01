import React, { useEffect, useState } from "react";
import { getValue } from "../../api/api";

const Calculator = (props) => {
  const [rate, setRate] = useState(null);
  console.log(rate);
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      props.history.push("/");
    } else {
      getValue()
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setRate(data);
        })
        .catch((error) => console.error(error));
    }
  }, []);
  if (!rate) {
    return null;
  }

  return (
    <div>
      <span>{Object.entries(rate.rates)[0][0]}</span>
      <input type="text" />
      <span>{Object.entries(rate.rates)[1][0]}</span>
      <input type="text" onChange={(e) => {}} />
    </div>
  );
};

export default Calculator;
