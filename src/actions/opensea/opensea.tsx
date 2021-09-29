import axios from "axios";
import { Dispatch } from "redux";
import { Assets } from "../../types/opensea";
import { OpenseaAction } from "./types";

const BASE_URL = "https://api.opensea.io/api/v1/assets";

// Retrieves Assets from the opensea API
export const getAssets = (owner: string) => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    const res = await axios.get<Assets>(
      `${BASE_URL}?owner=${owner}&order_direction=desc&offset=0&limit=20`
    );
    dispatch({
      type: OpenseaAction.GET_ASSETS_SUCCESS,
      response: res.data,
    });
  } catch (err) {
    //const errors = err.response.data.errors;

    dispatch({
      type: OpenseaAction.GET_ASSETS_FAIL,
    });
  }
};
