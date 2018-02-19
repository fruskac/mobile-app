// @flow

import {
  LOCATION_FILTER_CHANGE,
  OPEN_LOCATION_TYPE,
  OPEN_LOCATION_PLACE
} from "../store/types";
import { LocationFilter } from "../reducers/locationsReducer";

export function onLocationTypeChange(locationFilter: LocationFilter) {
  return { type: LOCATION_FILTER_CHANGE, locationFilter };
}

export function onOpenLocationType(type: string) {
  return { type: OPEN_LOCATION_TYPE, type };
}

export function onOpenLocationPlace(place: string) {
  return { type: OPEN_LOCATION_PLACE, place };
}
