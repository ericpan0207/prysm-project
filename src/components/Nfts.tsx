import { ImageList, ImageListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RootReducer } from "../reducers";
import { Asset } from "../types/opensea";

interface Prop {
  assets: Asset[];
  currentUser: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      alignItems: "center",
      marginTop: "2em",
      marginLeft: "1em",
      marginRight: "1em",
    },
  })
);

const Nfts: React.FC<Prop> = ({ currentUser, assets }: Prop) => {
  const classes = useStyles();

  useEffect(() => {}, [currentUser]);

  return (
    <>
      <div className={classes.container}>
        {assets && assets.length > 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            marginTop={"1em"}
            fontSize={18}
          >
            {currentUser?.substring(0, 6) +
              "..." +
              currentUser?.substring(currentUser.length - 4)}
            's NFTs
          </Typography>
        ) : null}

        <ImageList cols={3} rowHeight={500}>
          {assets.map((asset) => (
            <ImageListItem key={asset.image_url}>
              <img
                src={`${asset.image_url}?w=164&h=164&fit=crop&auto=format`}
                alt={"user NFT"}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        {assets.length == 0 ? (
          <Typography variant="body2" color="text.secondary" align="center">
            No NFTs found
          </Typography>
        ) : null}
      </div>
    </>
  );
};
const mapStateToProps = (state: RootReducer) => ({
  assets: state.opensea.assets,
});

export default connect(mapStateToProps)(Nfts);
