import { createSelector } from "reselect";

const _getNews = state => state.news.data;
const _getNewsId = (state, props) => {
  if (
    props &&
    props.navigation &&
    props.navigation.state &&
    props.navigation.state.params
  ) {
    return props.navigation.state.params.id;
  }

  if (
    state &&
    state.nav &&
    Array.isArray(state.nav.routes) &&
    typeof state.nav.index === "number" &&
    state.nav.routes[state.nav.index] &&
    state.nav.routes[state.nav.index].params
  ) {
    return state.nav.routes[state.nav.index].params.id;
  }

  return undefined;
};

export const getNews = createSelector([_getNews], news => news);
export const getNewsSingle = createSelector(
  [_getNews, _getNewsId],
  (news, newsId) =>
    news.find(n => n && String(n.id) === String(newsId)) || null
);
