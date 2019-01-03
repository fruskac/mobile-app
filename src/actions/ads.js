import {
  FETCH_CONFIG_SUCCESS,
} from "./actionTypes";
import { fetchConfig } from "../Api";


export const parseConfigJson = (entity: object) => {
  return { sponsor_logo: entity["sponsor_logo"], small_add: entity["small_add"], big_add: entity["big_add"] };
}

export const onFetchConfigSuccess = (payload: object) =>
  ({ type: FETCH_CONFIG_SUCCESS, payload: payload });

export const onFetchConfig = (language: string) => (dispatch) => {
  return fetchConfig(language)
  .then((result) => dispatch(onFetchConfigSuccess(parseConfigJson(result))))
  .catch((error) => console.log(error));
};
