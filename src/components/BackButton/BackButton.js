import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import I18n from "react-native-i18n";

type Props = {
  onNavigateBack: () => void
};
type State = {};

class BackButton extends PureComponent<Props, State> {
  render() {
    const { onNavigateBack } = this.props;
    return <Text onPress={onNavigateBack}>{I18n.t("back")}</Text>;
  }
}

export default BackButton;
