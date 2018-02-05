// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";

import Menu from "../../components/Menu";
import CommonStyles from "../../styles/CommonStyles";

type Props = {};
type State = {};

class Home extends PureComponent<Props, State> {
  render() {
    return (
      <View style={CommonStyles.container}>
        {/* TODO replace with image supplied by API */}
        <Menu />
      </View>
    );
  }
}

export default Home;
