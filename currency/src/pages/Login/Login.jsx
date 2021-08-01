import React, { useState, useEffect } from "react";
import loginStyle from "../Login/loginStyle.scss";

export default function Login(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("userInfo")) props.history.push("/");
  }, []);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name !== "" && password !== "") {
      console.log({
        name: name,
        password: password,
      });
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ name, id: Date.now() })
      );
      props.history.push("/");
    } else {
      console.log("Fill all inputs");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>Log in</h1>
      <label className="login-form__name">
        Name:
        <input type="text" onChange={handleChangeName} placeholder="name" />
      </label>
      <label className="login-form__password">
        Password:
        <input
          type="password"
          onChange={handleChangePassword}
          placeholder="password"
          name=""
          id=""
        />
      </label>
      <input className="login-form__btn" type="submit" value="Submit" />
    </form>
  );
}
