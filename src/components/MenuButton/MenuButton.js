// @flow
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text } from "react-native";
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
        <Text style={Styles.text}>{I18n.t("menu")}</Text>
      </TouchableOpacity>
    );
  }
}

export default MenuButton;
