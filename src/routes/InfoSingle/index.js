// @flow

import { connect } from "react-redux";
import InfoSingle from "./InfoSingle";
import { getLanguage } from "../../selectors/settings";
import { getInfoSingle } from "../../selectors/locations";
import { onNavigate } from "../../actions/navigation";

const mapDispatchToProps = { onNavigate };
const mapStateToProps = (state, ownProps) => {
  return {
    language: getLanguage(state),
    data: getInfoSingle(state, ownProps)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoSingle);
