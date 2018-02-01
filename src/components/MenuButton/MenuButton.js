// @flow
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text } from "react-native";
import I18n from "react-native-i18n";

import Styles from "./Styles";

type Props = {};
type State = {};

class MenuButton extends PureComponent<Props, State> {
  render() {
    return (
      <TouchableOpacity style={Styles.buttonHolder}>
        <Text style={Styles.text}>{I18n.t("menu")}</Text>
      </TouchableOpacity>
    );
  }
}

export default MenuButton;
