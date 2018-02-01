// @flow

import { connect } from "react-redux";
import BackButton from "./BackButton";
import { onNavigateBack } from "../../actions/navigation";

const mapDispatchToProps = {
  onNavigateBack
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BackButton);
