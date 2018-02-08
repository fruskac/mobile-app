// @flow

import { connect } from "react-redux";
import Drawer from "./Drawer";
import { onToggleDrawer } from "../../actions/settings";

const mapDispatchToProps = {};
const mapStateToProps = state => ({ drawerOpen: state.settings.drawerOpen });

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
