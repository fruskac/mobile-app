// @flow

import { connect } from "react-redux";
import CacheScreen from "./CacheScreen";
import { onFetchInfos } from "../../actions/info";

const mapDispatchToProps = { onFetchInfos };
const mapStateToProps = state => ({
  progress: state.cache.progress,
  done: state.cache.done,
  screen: state.cache.screen
});

export default connect(mapStateToProps, mapDispatchToProps)(CacheScreen);
