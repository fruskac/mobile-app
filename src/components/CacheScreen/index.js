// @flow

import { connect } from "react-redux";
import CacheScreen from "./CacheScreen";
import { onFetchInfos } from "../../actions/info";
import { onFetchLocations, onFetchMap } from "../../actions/locations";
import { cacheMap } from "../../actions/cache";
import { onFetchConfig } from "../../actions/ads";

const mapDispatchToProps = { onFetchInfos, onFetchLocations, onFetchMap, cacheMap, onFetchConfig };
const mapStateToProps = state => ({
  progress: state.cache.progress,
  error: state.cache.error,
  wholeStore: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(CacheScreen);
