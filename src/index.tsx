import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Web3 from "web3";
import App from "./App";
import "./index.css";
import store from "./store";

const getLibrary = (provider: any) => {
  return new Web3(provider);
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
