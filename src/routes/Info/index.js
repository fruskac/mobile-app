// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import I18n from "react-native-i18n";

type Props = {};
type State = {};

class Info extends PureComponent<Props, State> {
  render() {
    return <Text>{I18n.t("info")}</Text>;
  }
}

export default Info;
