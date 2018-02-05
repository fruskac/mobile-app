// @flow
import { connect } from "react-redux";
import ItemList from "./ItemList";
import { onNavigate } from "../../actions/navigation";

const mapDispatchToProps = { onNavigate };
const mapStateToProps = state => ({ language: state.settings.language });

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
