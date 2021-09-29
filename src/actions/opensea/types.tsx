import { Assets } from "../../types/opensea";

export enum OpenseaAction {
  GET_ASSETS_SUCCESS = "GET_ASSETS_SUCCESS",
  GET_ASSETS_FAIL = "GET_ASSETS_FAIL",
}

interface GetAssetsSuccess {
  type: OpenseaAction.GET_ASSETS_SUCCESS;
  response: Assets;
}

interface GetAssetsFail {
  type: OpenseaAction.GET_ASSETS_FAIL;
}

export type OpenseaActions = GetAssetsSuccess | GetAssetsFail;
