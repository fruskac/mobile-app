import {
  FETCH_CONFIG_SUCCESS,
} from './actionTypes';
import { fetchConfig } from '../../Api';


export const parseConfigJson = (entity) => {
  return { sponsor_logo: entity['sponsor_logo'], small_ad: entity['small_ad'], big_ad: entity['big_ad'] };
}

export const onFetchConfigSuccess = (payload) =>
  ({ type: FETCH_CONFIG_SUCCESS, payload: payload });

export const onFetchConfig = (language) => (dispatch, getState) => {
  const hasInternet = getState().cache.hasInternet
  if (hasInternet) {
    return fetchConfig(language)
    .then((result) => dispatch(onFetchConfigSuccess(parseConfigJson(result))))
    .catch((error) => console.log(error));
  }
};
