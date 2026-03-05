// @flow
import React, { PureComponent } from "react";
import { Animated, Easing } from "react-native";

import * as Screen from "../../utils/Screen";
import Menu from "../Menu";

type Props = {
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
      panelTranslateX: new Animated.Value(
        props.drawerOpen ? 0 : -Screen.widthDrawer
      )
    };

    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.drawerOpen !== this.props.drawerOpen) {
      if (this.props.drawerOpen) {
        this.openDrawer();
      } else {
        this.closeDrawer();
      }
    }
  }

  openDrawer() {
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
    return (
      <Animated.View
        pointerEvents={this.props.drawerOpen ? "auto" : "none"}
        style={[
          {
            position: "absolute",
            left: 0,
            zIndex: 30,
            top: 80,
            bottom: 0,
            width: Screen.widthDrawer,
            transform: [{ translateX: this.state.panelTranslateX }]
          }
        ]}
      >
        <Menu inDrawer />
      </Animated.View>
    );
  }
}

export default Drawer;
