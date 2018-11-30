import { FETCH_GOOD_TO_KNOW_SUCCESS } from './actionTypes';
import { fetchGoodToKnow } from '../Api';

export const onFetchGoodToKnowSuccess = (payload) =>
    ({ payload: payload, type: FETCH_GOOD_TO_KNOW_SUCCESS });

export const onFetchGoodToKnow = (language) => (dispatch, getState) => {
    fetchGoodToKnow(language)
    .then((data) => dispatch(onFetchGoodToKnowSuccess(addId(data.list))))
    .catch((error) => console.log(error));
}

const addId = (news) => {
    news.map((item, i) => {
        item.id = i;
    });
    return news;
}