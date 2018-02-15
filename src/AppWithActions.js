import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, NetInfo } from "react-native";
import { connect } from "react-redux";

import { onInternetStatus } from "./actions/cache";
import Navigation from "./navigators/Navigation";
import Drawer from "./components/Drawer/";
import CacheScreen from "./components/CacheScreen/";

class AppWithActions extends PureComponent {
  setupListenerOnline: () => void;
  handleConnectionChange: (connectionInfo: {}) => void;

  constructor(props: {}) {
    super(props);
    this.mounted = false;
    this.setupListenerOnline = this.setupListenerOnline.bind(this);
    this.handleConnectionChange = this.handleConnectionChange.bind(this);
  }

  componentDidMount() {
    // add network connection listeners
    this.setupListenerOnline();
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
    this.mounted = false;
  }

  setupListenerOnline() {
    if (!this.mounted) {
      // inital connection info
      NetInfo.getConnectionInfo().then(this.handleConnectionChange);
      // listen for internet connection changes
      NetInfo.addEventListener("connectionChange", this.handleConnectionChange);
      this.mounted = true;
    }
  }

  handleConnectionChange(connectionInfo) {
    console.log("CONNECTION INFO", connectionInfo);
    // dispatch action only if connection is known
    if (connectionInfo.type != "unknown")
      this.props.onInternetStatus(
        connectionInfo.type == "wifi" || connectionInfo.type == "cellular"
      );
  }

  render() {
    const { cachingDone } = this.props;
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }}
      >
        <Navigation />
        <Drawer />
        <CacheScreen />
      </View>
    );
  }
}

const mapDispatchToProps = { onInternetStatus };
const mapStateToProps = state => ({ cachingDone: state.cache.done });

export default connect(mapStateToProps, mapDispatchToProps)(AppWithActions);
