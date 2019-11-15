import { CACHING_UPDATE, INTERNET_STATUS, CACHING_ERROR } from './actionTypes';
import MapBox from '@react-native-mapbox-gl/maps';
import { NetInfo } from 'react-native';
 
let neLat = 45.265069,
  neLng = 19.924718,
  swLat = 45.112557,
  swLng = 19.32377;

export function onInternetStatus(hasInternet) {
  return { type: INTERNET_STATUS, hasInternet: hasInternet };
}

export const updateProgress = (progress) =>
  ({ type: CACHING_UPDATE, payload: progress })

export const cachingError = (error) =>
  ({ type: CACHING_ERROR, payload: error })

export const resetDownload = () => (dispatch, getState) => {
  dispatch(updateProgress(0));
  dispatch(cachingError(''));
}


export const cacheMap = () => async (dispatch, getState) => {
  const cache = getState().cache;
  // reseting error
  dispatch(cachingError(''));
  // checking if maps are already downloaded
  if (cache.progress == 100) {
    return;
  }
  let hasInternet = false;
  // check internet access
  while(!hasInternet) {
    await timeout(3000);
    hasInternet = await getInternetStatus();
    if (!hasInternet) dispatch(cachingError('No internet access.'));
    dispatch(onInternetStatus(hasInternet))
  }
  // since maps are not fully downloaded, delete them
  await MapBox.offlineManager.deletePack('FruskaGora')

  // start downloading maps
  MapBox.offlineManager.createPack(
    {
      name: 'FruskaGora',
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
  return;
};

export const getInternetStatus = async () => {
  const connectionInfo = await NetInfo.getConnectionInfo();
  console.log(connectionInfo)
  return connectionInfo.type == 'wifi' || connectionInfo.type == 'cellular';
}

const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}