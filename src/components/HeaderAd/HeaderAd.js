// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

import CommonStyles from "../../styles/CommonStyles";
import Styles from "./Styles";

type Props = {
  onOpenAd: () => void
};
type State = {};

class HeaderAd extends PureComponent<Props, State> {
  render() {
    const { onOpenAd } = this.props;
    return (
      <View style={Styles.adHolder} onPress={onOpenAd}>
        <Text style={CommonStyles.text}>HeaderAd</Text>
      </View>
    );
  }
}

export default HeaderAd;
