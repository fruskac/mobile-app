// @flow

import { connect } from "react-redux";
import NewsSingle from "./NewsSingle";

const mapDispatchToProps = {};
const mapStateToProps = state => ({ language: state.settings.language });

export default connect(mapStateToProps, mapDispatchToProps)(NewsSingle);
