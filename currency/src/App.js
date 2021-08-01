import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import Login from "../src/pages/Login/Login";
import Calculator from "../src/pages/Calculator/Calculator";
import SignUp from "../src/pages/SignUp/SignUp";
import { useHistory } from "react-router-dom";
import header from "../src/header.scss";

function App(props) {
  const history = useHistory();
  const handleOnClick = () => {
    if (localStorage.getItem("userInfo")) {
      localStorage.removeItem("userInfo");
      history.push("/login");
    }
  };

  return (
    <div className="App">
      <header className="header">
        <ul className="header_list">
          <li className="header_list-li">
            <Link className="header_list-link" to="/">
              Home
            </Link>
          </li>
          <li className="header_list-li">
            <Link className="header_list-link" to="/calculator">
              Calculator
            </Link>
          </li>
          <li className="header_list-li">
            <Link className="header_list-link" to="/login">
              Login
            </Link>
          </li>
          <li className="header_list-li">
            <Link className="header_list-link" to="/sign-up">
              Sign Up
            </Link>
          </li>
          <li className="header_list-btn">
            <button onClick={handleOnClick}>Log out</button>
          </li>
        </ul>
      </header>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/calculator" component={Calculator} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
