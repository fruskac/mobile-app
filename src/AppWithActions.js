import React, { PureComponent } from 'react';
import { View, NetInfo, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { onNavigateBack } from './store/actions/navigation';

import { onInternetStatus } from './store/actions/cache';
import { AppWithNavigationState } from './store/configureStore';
import CacheScreen from './components/CacheScreen/';
import SplashWithAd from './components/SplashScreen/index';

class AppWithActions extends PureComponent {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.setupListenerOnline = this.setupListenerOnline.bind(this);
    this.handleConnectionChange = this.handleConnectionChange.bind(this);
    this.state = {
      showSplashScreen: true,
    };
  }

  componentDidMount() {
    // add network connection listeners
    this.setupListenerOnline();
    this.setupBackHandler();
    setTimeout(() => this.setState({ showSplashScreen: false }), 3000);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleConnectionChange
    );
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.mounted = false;
  }

  setupBackHandler() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    const lastRoute = this.props.routes.slice(-1)[0];
    if (lastRoute.routeName === 'Home') {
      BackHandler.exitApp();
    }
    this.props.onNavigateBack();

    return true;
  }

  setupListenerOnline() {
    if (!this.mounted) {
      // inital connection info
      NetInfo.getConnectionInfo().then(this.handleConnectionChange);
      // listen for internet connection changes
      NetInfo.addEventListener('connectionChange', this.handleConnectionChange);
      this.mounted = true;
    }
  }

  handleConnectionChange(connectionInfo) {
    console.log('CONNECTION INFO', connectionInfo);
    // dispatch action only if connection is known
    if (connectionInfo.type != 'unknown') {
      this.props.onInternetStatus(connectionInfo.type == 'wifi' || connectionInfo.type == 'cellular');
    }
  }

  render() {
    return (this.state.showSplashScreen ?
      <SplashWithAd /> :
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }}
      >
        <CacheScreen />
        <AppWithNavigationState />
      </View>);
  }
}

const mapDispatchToProps = { onInternetStatus, onNavigateBack };
const mapStateToProps = state => ({ routes: state.nav.routes, cachingDone: state.cache.done });

export default connect(mapStateToProps, mapDispatchToProps)(AppWithActions);
