// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text, ScrollView, Image } from "react-native";
import * as Screen from "../../utils/Screen";

import CommonStyles from "../../styles/CommonStyles";

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
        <Image source={{uri: image}} style={{width: Screen.width, height: Screen.height / 3}} />
        <Text style={CommonStyles.textTitle}>{title}</Text>
        <Text style={CommonStyles.text}>{text}</Text>
      </ScrollView>
    );
  }
}

export default ItemSingle;
