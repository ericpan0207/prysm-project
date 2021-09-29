import produce from "immer";
import { OpenseaAction, OpenseaActions } from "../actions/opensea/types";
import { Asset } from "../types/opensea";

export interface OpenseaState {
  assets: Asset[];
}

export const initialState: OpenseaState = {
  assets: [],
};

export const reducer = (
  state = initialState,
  action: OpenseaActions
): OpenseaState => {
  switch (action.type) {
    case OpenseaAction.GET_ASSETS_SUCCESS:
      return produce(state, (draftState) => {
        draftState.assets = action.response.assets;
      });

    default:
      return state;
  }
};
