import { connect } from 'react-redux';
import CacheScreen from './CacheScreen';
import { onFetchInfos } from '../../store/actions/info';
import { onFetchLocations, onFetchMap } from '../../store/actions/locations';
import { cacheMap, resetDownload } from '../../store/actions/cache';
import { onFetchConfig } from '../../store/actions/ads';
import { getSponsorLogo } from '../../selectors/settings';
import { onFetchTracks } from '../../store/actions/tracks';
import { onFetchGoodToKnow } from '../../store/actions/goodToKnow';

const mapDispatchToProps = { onFetchInfos, onFetchLocations, onFetchMap, cacheMap, onFetchConfig, onFetchTracks, onFetchGoodToKnow, resetDownload };
const mapStateToProps = state => ({
  progress: state.cache.progress,
  error: state.cache.error,
  sponsor_logo: getSponsorLogo(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CacheScreen);
