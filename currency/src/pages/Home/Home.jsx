import React, { useEffect, useState } from "react";
import { getRates } from "../../api/api";

const Home = (props) => {
  const [rate, setRate] = useState(null);
  console.log(rate);
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      props.history.push("");
    } else {
      getRates("USD")
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
    <ul>
      {Object.entries(rate.rates).map((elem, i) => {
        return (
          <li key={i}>
            <span>{elem[0]}: </span>
            <span>{elem[1]}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Home;
