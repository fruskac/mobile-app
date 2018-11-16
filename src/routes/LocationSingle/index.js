// @flow

import { connect } from "react-redux";
import LocationSingle from "./LocationSingle";
import { getLocationSingle } from "../../selectors/locations";
import { onNavigate } from "../../actions/navigation";

const mapDispatchToProps = { onNavigate };
const mapStateToProps = (state, ownProps) => {
  return {
    language: state.settings.language,
    data: getLocationSingle(state, ownProps)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationSingle);
