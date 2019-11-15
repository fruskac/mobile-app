import { 
    FETCH_GOOD_TO_KNOW_SUCCESS,
    FETCH_GOOD_TO_KNOW_START,
    FETCH_GOOD_TO_KNOW_FAILURE,
    SET_PAGE_NUMBER,
    SET_REFRESHING,
    ALLOW_FETCH,
} from './actionTypes';
import { fetchGoodToKnow } from '../../Api';
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
    if (!state.goodToKnow.fetchAllowed || !state.cache.hasInternet) {
        return;
    }
    dispatch(onFetchGoodToKnowStart());
    const articles_rs = state.goodToKnow ? state.goodToKnow.articles_rs : null;
    const articles_en = state.goodToKnow ? state.goodToKnow.articles_en : null;
    fetchGoodToKnow(language, page)
    .then((data) => {
        if (language === 'rs') {
            dispatch(onFetchGoodToKnowSuccess({ 
                articles_rs: addId(articles_rs && page !== 0 ? articles_rs.concat(data.list) : data.list),
                articles_en: articles_en,
            })); 
        } else {
            dispatch(onFetchGoodToKnowSuccess({ 
                articles_en: addId(articles_en && page !== 0 ? articles_en.concat(data.list) : data.list),
                articles_rs: articles_rs,
            })); 
        }
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

