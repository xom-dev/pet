import React, { useState, useEffect } from "react";
import signUpStyle from "../SignUp/signUpStyle.scss";

export default function SignUp(props) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    repeatedPass: "",
  });
  useEffect(() => {
    if (localStorage.getItem("userInfo")) props.history.push("/");
  }, []);

  const handleSubmit = (event) => {
    if (
      values.name !== "" &&
      values.email !== "" &&
      values.password !== "" &&
      values.repeatedPass !== ""
    ) {
      if (values.repeatedPass === values.password) {
        console.log({
          name: values.name,
          email: values.email,
          password: values.password,
        });
        props.history.push("/");
      } else {
        console.log("Password are not same. Try again");
      }
    } else {
      console.log("Fill all inputs");
    }
    event.preventDefault();
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h1>Sign Up</h1>

      <label className="signup-form__name">
        Name:
        <input
          type="text"
          onChange={(e) =>
            setValues({
              ...values,
              name: e.target.value,
            })
          }
          placeholder="name"
        />
      </label>

      <label className="signup-form__email">
        Email:
        <input
          type="email"
          onChange={(e) =>
            setValues({
              ...values,
              email: e.target.value,
            })
          }
          placeholder="email"
        />
      </label>

      <label className="signup-form__password">
        Password:
        <input
          type="password"
          onChange={(e) =>
            setValues({
              ...values,
              password: e.target.value,
            })
          }
          placeholder="password"
          name=""
          id=""
        />
      </label>

      <label className="signup-form__repeatpass">
        Write password again:
        <input
          type="password"
          onChange={(e) =>
            setValues({
              ...values,
              repeatedPass: e.target.value,
            })
          }
          placeholder="password again"
          name=""
          id=""
        />
      </label>

      <input className="signup-form__btn" type="submit" value="Submit" />
    </form>
  );
}
