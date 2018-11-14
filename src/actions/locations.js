// @flow
import Permissions from 'react-native-permissions';

import {
  LOCATION_FILTER_CHANGE,
  OPEN_LOCATION_TYPE,
  OPEN_LOCATION_PLACE
} from "./actionTypes";

import { LocationFilter } from "../types/";

export function onLocationTypeChange(filter: LocationFilter) {
  return { type: LOCATION_FILTER_CHANGE, filter };
}

export function onOpenLocationType(type: string) {
  return { type: OPEN_LOCATION_TYPE, type };
}

export function onOpenLocationPlace(place: string) {
  return { type: OPEN_LOCATION_PLACE, place };
}

export const requestLocationPermission = async () => {
  return Permissions.request('location').then(response => {
    return response === 'authorized';
  })
}

export const askPermissions = async () => {
  return Permissions.check('location')
    .then(async (response) => {
      if (response !== 'authorized') {
      
        return await requestLocationPermission();
      }

      return true;
    })
}
