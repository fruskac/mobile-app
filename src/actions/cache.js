// @flow

import { CACHING_UPDATE, INTERNET_STATUS, CACHING_ERROR } from "./actionTypes";
import MapBox from "@mapbox/react-native-mapbox-gl";
import { NetInfo } from "react-native";
 
let neLat = 45.265069,
  neLng = 19.924718,
  swLat = 45.112557,
  swLng = 19.32377;

export function onInternetStatus(hasInternet: boolean) {
  return { type: INTERNET_STATUS, hasInternet: hasInternet };
}

export const updateProgress = (progress: number) =>
  ({ type: CACHING_UPDATE, payload: progress })

export const cachingError = (error: string) =>
  ({ type: CACHING_ERROR, payload: error })


export const cacheMap = () => async (dispatch, getState) => {
  const cache = getState().cache;
  // reseting error
  dispatch(cachingError(''));
  const hasInternet = await getInternetStatus();
  dispatch(onInternetStatus(hasInternet))
  // checking if maps are already downloaded
  if (cache.progress == 100) {
    return;
  }

  // check internet access
  if (!hasInternet) {
    dispatch(cachingError('No internet access.'));
    return;
  }

  // since maps are not fully downloaded, delete them
  await MapBox.offlineManager.deletePack('FruskaGora')

  // start downloading maps
  MapBox.offlineManager.createPack(
    {
      name: "FruskaGora",
      minZoom: 10,
      maxZoom: 22,
      bounds: [[neLng, neLat], [swLng, swLat]],
      styleURL: MapBox.StyleURL.Street,
    },
    (offlineRegion, status) => {
      dispatch(updateProgress(status.percentage));
    },
    (offlineRegion, err) => {
      dispatch(cachingError('Error while downloading maps.'))
    }
  );
};

export const getInternetStatus = async () => {
  const connectionInfo = await NetInfo.getConnectionInfo();
  return connectionInfo.type == "wifi" || connectionInfo.type == "cellular";
}