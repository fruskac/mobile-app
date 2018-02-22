import { createSelector } from "reselect";

const _getLanguage = state => state.settings.language;

export const getLanguage = createSelector([_getLanguage], lang => lang);
