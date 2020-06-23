import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import "./index.css";

import store from "./store";
import Header from "./components/Header";
import Main from "./container/Main";

const App = () => (
  <Provider store={store}>
    <Header />
    <Main />
  </Provider>
);

render(<App />, document.getElementById("root"));
