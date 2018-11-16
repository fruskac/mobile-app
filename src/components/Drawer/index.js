// @flow

import { connect } from "react-redux";
import SideMenu from "./Drawer";
import { onCloseDrawer } from "../../actions/settings";

const mapDispatchToProps = { onCloseDrawer };
const mapStateToProps = state => ({ drawerOpen: state.settings.drawerOpen });

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
