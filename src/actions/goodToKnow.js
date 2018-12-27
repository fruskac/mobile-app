import { 
    FETCH_GOOD_TO_KNOW_SUCCESS,
    FETCH_GOOD_TO_KNOW_START,
    FETCH_GOOD_TO_KNOW_FAILURE,
    SET_PAGE_NUMBER,
    SET_REFRESHING,
    ALLOW_FETCH,
} from './actionTypes';
import { fetchGoodToKnow } from '../Api';
const { ImageCacheManager } = require('react-native-cached-image');
const manager = ImageCacheManager({});

export const onFetchGoodToKnowStart = () =>
    ({ type: FETCH_GOOD_TO_KNOW_START });

export const onFetchGoodToKnowSuccess = (payload) =>
    ({ payload: payload, type: FETCH_GOOD_TO_KNOW_SUCCESS });

export const onFetchGoodToKnowFailure = () =>
    ({ type: FETCH_GOOD_TO_KNOW_FAILURE });

export const onFetchGoodToKnow = (language, page) => (dispatch, getState) => {
    const state = getState();
    if (!state.goodToKnow.fetchAllowed) {
        return;
    }
    dispatch(onFetchGoodToKnowStart());
    const articles = state.goodToKnow ? state.goodToKnow.articles ?  state.goodToKnow.articles : null : null;
    fetchGoodToKnow(language, page)
    .then((data) => {
        dispatch(onFetchGoodToKnowSuccess(addId(articles && page !== 0 ? articles.concat(data.list) : data.list))); 
        dispatch(onSetRefreshing(false));
        if (data.length < 20) {
            dispatch(onAllowFetch(false));
        }
    })
    .catch(() => dispatch(onFetchGoodToKnowFailure()));
}

const addId = (news) => {
    news.map((item, i) => {
        item.id = i;
        if (item.image) {
            manager.downloadAndCacheUrl(item.image);
        }
    });
    return news;
}

export const onSetPageNumber = (pageNumber) =>
    ({ type: SET_PAGE_NUMBER, payload: pageNumber });

export const setPageNumber = (pageNumber) => (dispatch) => {
    dispatch(onSetPageNumber(pageNumber));
}

export const onSetRefreshing = (refreshing) =>
    ({ type: SET_REFRESHING, payload: refreshing });

export const setRefreshing = (refreshing) => (dispatch) => {
    dispatch(onSetRefreshing(refreshing));
}

export const onAllowFetch = (fetchAllowed) =>
    ({ type: ALLOW_FETCH, payload: fetchAllowed });

