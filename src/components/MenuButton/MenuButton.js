// @flow
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, Image } from "react-native";
import I18n from "react-native-i18n";

import Styles from "./Styles";

type Props = {
  onToggleDrawer: () => void
};
type State = {};

class MenuButton extends PureComponent<Props, State> {
  render() {
    const { onToggleDrawer } = this.props;

    return (
      <TouchableOpacity style={Styles.buttonHolder} onPress={onToggleDrawer}>
        <Image source={require('../../assets/menu-icons-png/icons8-menu-vertical-32.png')} />
      </TouchableOpacity>
    );
  }
}

export default MenuButton;
