// @flow
import Permissions from 'react-native-permissions';

import {
  LOCATION_FILTER_CHANGE,
  OPEN_LOCATION_TYPE,
  OPEN_LOCATION_PLACE,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_MAP_SUCCESS,
} from "./actionTypes";
import { fetchCategories, fetchMap } from "../Api";

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

export const onFetchLocationsSuccess = (payload: object) =>
  ({ type: FETCH_CATEGORIES_SUCCESS, payload });

export const onFetchLocations = (language: string) => (dispatch: func) => {
  fetchCategories(language)
  .then((result) => {
    const locations = parseLocationJson(result.locations);
    const places = parseLocationJson(result.places);
    const tourism = parseLocationJson(result.tourism);

    dispatch(onFetchLocationsSuccess({
      locations_sr: locations.entities_rs,
      locations_en: locations.entities_en,
      places_rs: places.entities_rs,
      places_en: places.entities_en,
      tourism_rs: tourism.entities_rs,
      tourism_en: tourism.entities_en
    }));  
  })
  .catch((error) => console.log(error));
};



export const parseLocationJson = (entity: object) => {
  const entities_rs = [];
  const entities_en = [];

  for (var key in entity) {
    if (entity.hasOwnProperty(key)) {
      entities_rs.push({ key: key, id: entity[key].id, name: entity[key].name_rs, description: entity[key].desctiption_rs });
      entities_en.push({ key: key, id: entity[key].id, name: entity[key].name_en, description: entity[key].desctiption_en });
    }
  }

  return { entities_rs: entities_rs, entities_en: entities_en };
}

export const onFetchMapSuccess = (payload: object) =>
  ({ type: FETCH_MAP_SUCCESS, payload: payload });

export const onFetchMap = (language: string) => (dispatch) => {
  return fetchMap(language)
  .then((result) => dispatch(onFetchMapSuccess(parseMapJson(result))))
  .catch((error) => console.log(error));
};

export const parseMapJson = (mapData: object) => {
  const map_rs = [];
  const map_en = [];
  mapData["app-map"].map((map) => {
    map_rs.push({
      title: map.title_rs,
      type: map.type,
      category: map.category,
      lat: map.lat,
      lng: map.lng,
      place: map.place,
      id: map.id,
      link: map.link_rs,
      description: map.description_rs,
      image: map.image,
      description_long: map.description_long_rs,
    });

    map_en.push({
      title: map.title_en,
      type: map.type,
      category: map.category,
      lat: map.lat,
      lng: map.lng,
      place: map.place,
      id: map.id,
      link: map.link_en,
      description: map.description_en,
      image: map.image,
      description_long: map.description_long_en,
    });
  });

  return { map_rs: map_rs, map_en: map_en };
}