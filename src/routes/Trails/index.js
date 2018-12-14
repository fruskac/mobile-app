// @flow

import { connect } from "react-redux";
import Trails from "./Trails";
import { onNavigate } from "../../actions/navigation";
import { getTracks } from "../../selectors/locations";
import { onFetchTracks } from "../../actions/tracks";

const mapDispatchToProps = {onNavigate, onFetchTracks};

const mapStateToProps = (state, ownProps) => {
  return {
    language: ownProps.screenProps.language,
    tracks: getTracks(state, ownProps),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trails);