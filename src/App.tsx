import { useWeb3React } from "@web3-react/core";
import React from "react";
import "./App.css";
import Nfts from "./components/Nfts";
import { injected } from "./components/wallet/connectors";

const App = () => {
  const {
    active,
    account,
    library,
    connector,
    activate,
    deactivate,
  } = useWeb3React();

  const connect = async () => {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };

  const disconnect = async () => {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="App">
      <button onClick={connect}>Connect to MetaMask</button>
      {active ? (
        <span>
          Connected with <b>{account}</b>
          <Nfts />
        </span>
      ) : (
        <span>Not connected</span>
      )}
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
};

export default App;
