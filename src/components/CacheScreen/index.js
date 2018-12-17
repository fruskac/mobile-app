// @flow

import { connect } from "react-redux";
import CacheScreen from "./CacheScreen";
import { onFetchInfos } from "../../actions/info";
import { onFetchLocations, onFetchMap } from "../../actions/locations";

const mapDispatchToProps = { onFetchInfos, onFetchLocations, onFetchMap };
const mapStateToProps = state => ({
  progress: state.cache.progress,
  done: state.cache.done,
  screen: state.cache.screen
});

export default connect(mapStateToProps, mapDispatchToProps)(CacheScreen);
