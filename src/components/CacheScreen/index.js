// @flow

import { connect } from "react-redux";
import CacheScreen from "./CacheScreen";
import { onFetchInfos } from "../../actions/info";
import { onFetchLocations, onFetchMap } from "../../actions/locations";
import { cacheMap } from "../../actions/cache";
import { onFetchConfig } from "../../actions/ads";
import { getSponsorLogo } from "../../selectors/settings";
import { onNavigate } from "../../actions/navigation";

const mapDispatchToProps = { onFetchInfos, onFetchLocations, onFetchMap, cacheMap, onFetchConfig };
const mapStateToProps = state => ({
  progress: state.cache.progress,
  error: state.cache.error,
  wholeStore: state,
  sponsor_logo: getSponsorLogo(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CacheScreen);
