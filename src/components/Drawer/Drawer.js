// @flow
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Animated, Easing, View, Text } from "react-native";

import * as Screen from "../../utils/Screen";
import Menu from "../Menu";

type Props = {
  onToggleDrawer: () => void,
  drawerOpen: boolean
};
type State = {
  panelTranslateX: Animated.Value
};

class Drawer extends PureComponent<Props, State> {
  closeDrawer: Function;
  openDrawer: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      panelTranslateX: new Animated.Value(-Screen.widthDrawer)
    };

    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  componentWillReceiveProps(nextProps: Object) {
    console.log("drawer ", nextProps);
    if (this.props.drawerOpen != nextProps.drawerOpen) {
      if (nextProps.drawerOpen) {
        this.openDrawer();
      } else {
        this.closeDrawer();
      }
    }
  }

  openDrawer() {
    console.log("Open drwaer");
    Animated.timing(
      this.state.panelTranslateX, // The animated value to drive
      {
        toValue: 0,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
        duration: 150
      }
    ).start();
  }

  closeDrawer() {
    console.log("Close drwaer");
    Animated.timing(
      this.state.panelTranslateX, // The animated value to drive
      {
        toValue: -Screen.widthDrawer,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
        duration: 150
      }
    ).start();
  }

  render() {
    const { onToggleDrawer } = this.props;

    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            left: 0,
            zIndex: 30,
            top: 80,
            bottom: 0,
            height: Screen.height - 40,
            transform: [{ translateX: this.state.panelTranslateX }]
          }
        ]}
      >
        <Menu inDrawer />
        <Text>asdaD</Text>
      </Animated.View>
    );
  }
}

export default Drawer;
