// @flow

import { connect } from "react-redux";
import Home from "./Home";
import { onChangeLanguage } from "../../actions/settings";

const mapDispatchToProps = {
  onChangeLanguage
};
const mapStateToProps = state => ({ language: state.settings.language });

export default connect(mapStateToProps, mapDispatchToProps)(Home);
