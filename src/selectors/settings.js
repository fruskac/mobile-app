import { createSelector } from 'reselect';

const _getLanguage = state => state.settings.language == 'en' ? 'en' : 'rs';

const _getAds = state => state.ads;

export const getLanguage = createSelector([_getLanguage], lang => lang);

export const getSponsorLogo = createSelector(
    [_getAds],
    (ads) =>
      ads['sponsor_logo']
  );
  
export const getBigAd = createSelector(
    [_getAds],
    (ads) =>
      ads['big_ad']
  );
  
export const getSmallAd = createSelector(
    [_getAds],
    (ads) =>
      ads['small_ad']
  );
