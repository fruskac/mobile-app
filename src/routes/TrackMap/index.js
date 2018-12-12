// @flow

import { connect } from "react-redux";
import TrackMap from "./TrackMap";
import { getLanguage } from "../../selectors/settings";
import { onNavigate } from "../../actions/navigation";
import { getTrackSingle } from "../../selectors/locations";

const mapDispatchToProps = { onNavigate };
const mapStateToProps = (state, ownProps) => {
  return {
    language: getLanguage(state),
    data: getTrackSingle(state, ownProps),
    id: ownProps.navigation.state.params.id,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackMap);
