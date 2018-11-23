import { fetchUrl } from "./utils/Fetch";

const BASE = "https://fruskac.net";

export const FETCH_CATEGORIES_START = "FETCH_CATEGORIES_START";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";

export const onFetchCategoriesStart = () => ({ type: FETCH_CATEGORIES_START });
export const onFetchCategoriesSuccess = (payload) => ({ type: FETCH_CATEGORIES_SUCCESS, payload: payload });

export const fetchCategories = (language) =>
    fetchUrl(`${BASE}/${language}/json/app-categories`);

export const fetchGoodToKnow = (language) =>
    fetchUrl(`${BASE}/${language}/json/app-good-to-know`);

export const fetchMap = (language) =>
    fetchUrl(`${BASE}/${language}/json/app-map`);
    
