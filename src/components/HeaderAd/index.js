// @flow

import { connect } from "react-redux";
import HeaderAd from "./HeaderAd";
import { onOpenAd } from "../../actions/navigation";

const mapDispatchToProps = {
  onOpenAd
};
const mapStateToProps = state => ({ language: state.settings.language });

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAd);
