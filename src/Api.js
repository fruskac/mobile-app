import { fetchUrl } from "./utils/Fetch";

const BASE = "https://fruskac.net";

export const fetchCategories = (language) =>
    fetchUrl(`${BASE}/${language}/json/app-categories`);

export const fetchGoodToKnow = (language) =>
    fetchUrl(`${BASE}/${language}/json/app-good-to-know`);

export const fetchMap = (language) =>
    fetchUrl(`${BASE}/${language}/json/app-map`);
    
