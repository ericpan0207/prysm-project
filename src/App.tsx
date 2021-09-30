import { Search } from "@mui/icons-material";
import { Box, Button, Grid, InputBase } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAssets } from "./actions/opensea/opensea";
import "./App.css";
import Nfts from "./components/Nfts";
import { injected } from "./components/wallet/connectors";
import { RootReducer } from "./reducers";
import { Asset } from "./types/opensea";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      alignItems: "center",
      marginTop: "2em",
      marginLeft: "1em",
      marginRight: "1em",
    },
    grid: {
      flexGrow: 1,
    },
    searchIcon: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: "0.55em",
      paddingBottom: "0.3em",
      paddingRight: "0.5em",

      "&:hover": {
        cursor: "pointer",
      },
    },
    search: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",

      borderRadius: 20,

      "&:hover": {
        borderColor: "black",
      },
    },
    connectButton: {
      float: "right",
      margin: "0 2em 2em",
      boxShadow: "none",
      textTransform: "none",

      borderColor: "black",
      color: "black",
      "&:hover": {
        cursor: "pointer",
      },
    },
  })
);

interface Prop {
  getAssets: (owner: string) => void;
  assets: Asset[];
}

const App: React.FC<Prop> = ({ getAssets, assets }: Prop) => {
  const classes = useStyles();

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

  const [searchQuery, setQuery] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    if (account) {
      getAssets(account);
    }
  }, [getAssets, account]);

  useEffect(() => {
    setQuery("");
  }, [assets]);

  const search = (query: string) => {
    if (query) {
      setCurrentUser(query);
      getAssets(query);
    }
  };

  return (
    <div className={classes.container}>
      <Grid container className={classes.grid} spacing={0}>
        <Grid item xs={9}>
          <Box border={1} borderColor="#e0e0e0" className={classes.search}>
            <InputBase
              fullWidth
              placeholder="Search Ethereum Addresses"
              style={{ paddingLeft: "1em", paddingTop: "0.25em" }}
              value={searchQuery}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  search(searchQuery);
                }
              }}
            />
            <div
              onClick={() => search(searchQuery)}
              className={classes.searchIcon}
            >
              <Search />
            </div>
          </Box>
        </Grid>
        <Grid item xs={active ? 2 : 1}>
          {active ? (
            <Button
              variant="outlined"
              style={{
                float: "left",
                margin: "0 2em 2em",
                boxShadow: "none",
                textTransform: "none",

                borderColor: "black",
                color: "black",
              }}
              onClick={() => search(account || "")}
            >
              View My NFTs
            </Button>
          ) : null}
        </Grid>
        <Grid item xs={active ? 1 : 2}>
          {active ? (
            <Button
              className={classes.connectButton}
              variant="outlined"
              onClick={disconnect}
              style={{
                float: "right",
                margin: "0 2em 2em",
                boxShadow: "none",
                textTransform: "none",

                borderColor: "black",
                color: "black",
              }}
            >
              Disconnect
            </Button>
          ) : (
            <Button
              className={classes.connectButton}
              variant="outlined"
              onClick={connect}
              style={{
                float: "right",
                margin: "0 2em 2em",
                boxShadow: "none",
                textTransform: "none",

                borderColor: "black",
                color: "black",
              }}
            >
              Connect Wallet
            </Button>
          )}
        </Grid>
      </Grid>
      <Nfts currentUser={currentUser} />
    </div>
  );
};

const mapStateToProps = (state: RootReducer) => ({
  assets: state.opensea.assets,
});

const mapDispatchToProps = {
  getAssets,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
