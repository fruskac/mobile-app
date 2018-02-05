// @flow
import { connect } from "react-redux";
import Menu from "./Menu";
import { onChangeLanguage } from "../../actions/settings";
import { onNavigate } from "../../actions/navigation";

const mapDispatchToProps = { onChangeLanguage, onNavigate };
const mapStateToProps = state => ({ language: state.settings.language });

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
