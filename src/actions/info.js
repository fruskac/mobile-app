import {
    FETCH_INFO_SUCCESS,
} from "../actions/actionTypes";

import { fetchInfo } from '../Api';

export const onFetchInfoSuccess = (payload) =>
    ({ type: FETCH_INFO_SUCCESS, payload: payload });

export const onFetchInfos = (language) => (dispatch, getState) => {
    fetchInfo(language)
    .then((data) => dispatch(onFetchInfoSuccess(parseInfoJson(data))))
    .catch(error => console.log(error));
}

export const parseInfoJson = (infos) => {
    const info_rs = [];
    const info_en = [];

    infos["app-info"].map((info) => {
        info_rs.push({
           title: info.title_rs,
           type: info.type,
           id: info.id,
           link: info.link_rs,
           description: info.description_rs,
           image: info.image,
           description_long: info.description_long_rs,
        });
    
        info_en.push({
            title: info.title_en,
            type: info.type,
            id: info.id,
            link: info.link_en,
            description: info.description_en,
            image: info.image,
            description_long: info.description_long_en,
        });
    });
    return { info_rs, info_en };
}