// @flow
import { connect } from "react-redux";
import Menu from "./Menu";
import { onChangeLanguage } from "../../actions/settings";
import { onNavigate } from "../../actions/navigation";
import { bindActionCreators } from "redux";

const mapDispatchToProps = dispatch => bindActionCreators({ onChangeLanguage, onNavigate }, dispatch);
const mapStateToProps = state => ({ language: state.settings.language });

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
