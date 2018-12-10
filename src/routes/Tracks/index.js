// @flow

import { connect } from "react-redux";
import Tracks from "./Tracks";
import { getLanguage } from "../../selectors/settings";
import { getTracksByCategoryName } from "../../selectors/locations";
import { onNavigate } from "../../actions/navigation";


const mapDispatchToProps = { onNavigate };
const mapStateToProps = (state, ownProps) => ({
  language: getLanguage(state),
  tracks: getTracksByCategoryName(state, ownProps)
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
