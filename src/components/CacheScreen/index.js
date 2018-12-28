// @flow

import { connect } from "react-redux";
import CacheScreen from "./CacheScreen";
import { onFetchInfos } from "../../actions/info";
import { onFetchLocations, onFetchMap } from "../../actions/locations";
import { cacheMap } from "../../actions/cache";

const mapDispatchToProps = { onFetchInfos, onFetchLocations, onFetchMap, cacheMap };
const mapStateToProps = state => ({
  progress: state.cache.progress,
  error: state.cache.error,
  wholeStore: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(CacheScreen);
