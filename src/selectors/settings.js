import { createSelector } from "reselect";

const _getLanguage = state => state.settings.language == "en" ? "en" : "rs";

export const getLanguage = createSelector([_getLanguage], lang => lang);
