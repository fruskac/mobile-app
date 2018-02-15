// @flow

import { connect } from "react-redux";
import CacheScreen from "./CacheScreen";

const mapDispatchToProps = {};
const mapStateToProps = state => ({
  progress: state.cache.progress,
  screen: state.cache.screen
});

export default connect(mapStateToProps, mapDispatchToProps)(CacheScreen);
