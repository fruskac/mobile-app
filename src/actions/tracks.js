import {
    FETCH_TRACKS_SUCCESS
} from "./actionTypes";

import { fetchTracks } from "../Api";
const { ImageCacheManager } = require('react-native-cached-image');
const manager = ImageCacheManager({});

export const onFetchTracksSuccess = (payload) =>
    ({ type: FETCH_TRACKS_SUCCESS, payload: payload });

export const onFetchTracks = (language) => (dispatch, getState) => {
    fetchTracks(language)
    .then((data) => dispatch(onFetchTracksSuccess(parseTracksJson(data))))
    .catch(error => console.log(error));
}

export const parseTracksJson = (tracks) => {
    const tracks_rs = [];
    const tracks_en = [];
    tracks["app-tracks"].map((track) => {
        tracks_rs.push({
            title: track.title_rs,
            type: track.type,
            track_category: track.track_category,
            track_type: track.track_type,
            track_url: track.track_url,
            place: track.place,
            id: track.id,
            link: track.link_rs,
            description: track.description_rs,
            image: track.image,
            description_long: track.description_long_rs,
        });
    
        tracks_en.push({
            title: track.title_en,
            type: track.type,
            track_category: track.track_category,
            track_type: track.track_type,
            track_url: track.track_url,
            place: track.place,
            id: track.id,
            link: track.link_en,
            description: track.description_en,
            image: track.image,
            description_long: track.description_long_en,
        });
        if (track.image) {
            manager.downloadAndCacheUrl(track.image);
        }
    });
    return { tracks_rs, tracks_en };
}