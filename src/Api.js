import { fetchUrl } from './utils/Fetch';

const BASE = 'https://fruskac.net';

export const fetchCategories = (language) =>
    fetchUrl(`${BASE}/rs/json/app-categories`);

export const fetchGoodToKnow = (language, page) =>
    fetchUrl(`${BASE}/${language}/json/app-good-to-know${page ? '?page=' + page : ''}`);

export const fetchMap = (language) =>
    fetchUrl(`${BASE}/${language}/json/app-map`);
    
export const fetchTracks = (language) =>
    fetchUrl(`${BASE}/${language}/json/app-tracks`);

export const fetchInfo = (language) =>
    fetchUrl(`${BASE}/${language}/json/app-info`);

export const fetchConfig = (language) =>
    fetchUrl(`${BASE}/${language}/json/app-config`);