import { combineReducers } from "redux";
import { reducer as openseaReducer } from "../reducers/opensea";

export const reducer = combineReducers({
  opensea: openseaReducer,
});

export type RootReducer = ReturnType<typeof reducer>;
