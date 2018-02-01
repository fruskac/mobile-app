// @flow

import { connect } from "react-redux";
import Home from "./Home";
import { onChangeLanguage } from "../../actions/settings";
import { onNavigate, onNavigateBack } from "../../actions/navigation";

const mapDispatchToProps = {
  onChangeLanguage,
  onNavigate,
  onNavigateBack
};
const mapStateToProps = state => ({ language: state.settings.language });

export default connect(mapStateToProps, mapDispatchToProps)(Home);
