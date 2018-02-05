// @flow

import { connect } from "react-redux";
import News from "./News";

const mapDispatchToProps = {};
const mapStateToProps = state => ({ language: state.settings.language });

export default connect(mapStateToProps, mapDispatchToProps)(News);
