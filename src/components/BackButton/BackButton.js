import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import I18n from "react-native-i18n";
import Icon from "react-native-vector-icons/Ionicons";

import Styles from "./Styles";

type Props = {
  onNavigateBack: () => void
};
type State = {};

class BackButton extends PureComponent<Props, State> {
  render() {
    const { onNavigateBack } = this.props;
    return (
      <View style={Styles.buttonHolder} onPress={onNavigateBack}>
        <Icon name="ios-arrow-back" />
        <Text>{I18n.t("back")}</Text>
      </View>
    );
  }
}

export default BackButton;
