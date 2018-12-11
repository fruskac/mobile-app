// @flow

import { connect } from "react-redux";
import TrackSingle from "./TrackSingle";
import { getLanguage } from "../../selectors/settings";
import { getTrackSingle } from "../../selectors/locations";
import { onNavigate } from "../../actions/navigation";

const mapDispatchToProps = { onNavigate };
const mapStateToProps = (state, ownProps) => {
  return {
    language: getLanguage(state),
    data: getTrackSingle(state, ownProps)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackSingle);
