// @flow
import { connect } from "react-redux";
import ItemList from "./ItemList";

const mapDispatchToProps = {};
const mapStateToProps = state => ({ language: state.settings.language });

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
