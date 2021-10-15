import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import store from "./app/store";
import { Provider } from "react-redux";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
  rootElement
);
