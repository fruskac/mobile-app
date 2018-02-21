// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, ScrollView } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import * as Screen from "../../utils/Screen";

import CommonStyles from "../../styles/CommonStyles";
import Styles from "./Styles";

type Props = {
  title: string,
  image: string,
  text: string
};
type State = {};

class ItemSingle extends PureComponent<Props, State> {
  render() {
    const { title, image, text } = this.props;
    return (
      <ScrollView>
        <AutoHeightImage width={Screen.width} source={{ uri: image }} />
        <Text style={Styles.textTitle}>{title}</Text>
        <Text style={Styles.text}>{text}</Text>
      </ScrollView>
    );
  }
}

export default ItemSingle;
