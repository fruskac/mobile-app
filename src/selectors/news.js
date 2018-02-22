import { createSelector } from "reselect";

const _getNews = state => state.news.data;
const _getNewsId = (state, props) => props.navigation.state.params.id;

export const getNews = createSelector([_getNews], news => news);
export const getNewsSingle = createSelector(
  [_getNews, _getNewsId],
  (news, newsId) => news.filter(n => n.id === newsId)[0]
);
