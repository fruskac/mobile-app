import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";

import { onInternetStatus } from "./actions/cache";
import Navigation from "./navigators/Navigation";
import Drawer from "./components/Drawer";

class AppWithActions extends PureComponent {
  setupListenerOnline: () => void;
  handleConnectionChange: (connectionInfo: {}) => void;
  netInfoUnsubscribe: ?Function;

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
    if (this.netInfoUnsubscribe) {
      this.netInfoUnsubscribe();
      this.netInfoUnsubscribe = null;
    }
    this.mounted = false;
  }

  setupListenerOnline() {
    if (!this.mounted) {
      // inital connection info
      NetInfo.fetch().then(this.handleConnectionChange);
      // listen for internet connection changes
      this.netInfoUnsubscribe = NetInfo.addEventListener(
        this.handleConnectionChange
      );
      this.mounted = true;
    }
  }

  handleConnectionChange(connectionInfo) {
    // dispatch action only if connection state is known
    if (typeof connectionInfo.isConnected === "boolean") {
      this.props.onInternetStatus(connectionInfo.isConnected);
      return;
    }

    if (connectionInfo.type != "unknown") {
      this.props.onInternetStatus(
        connectionInfo.type == "wifi" || connectionInfo.type == "cellular"
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Navigation />
        </View>
        <Drawer />
      </View>
    );
  }
}

const mapDispatchToProps = { onInternetStatus };
const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AppWithActions);
