import { ImageList, ImageListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAssets } from "../actions/opensea/opensea";
import { RootReducer } from "../reducers";
import { Asset } from "../types/opensea";

interface Prop {
  getAssets: (owner: string) => void;
  assets: Asset[];
}

const Nfts: React.FC<Prop> = ({ getAssets, assets }: Prop) => {
  useEffect(() => {
    getAssets("0xCba1A275e2D858EcffaF7a87F606f74B719a8A93");
  }, [getAssets]);

  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center">
        User NFTs
      </Typography>

      <ImageList>
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
    </>
  );
};
const mapStateToProps = (state: RootReducer) => ({
  assets: state.opensea.assets,
});

const mapDispatchToProps = {
  getAssets,
};

export default connect(mapStateToProps, mapDispatchToProps)(Nfts);
