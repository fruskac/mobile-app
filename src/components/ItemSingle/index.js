// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text, ScrollView, Image } from "react-native";
import * as Screen from "../../utils/Screen";
import HTMLView from 'react-native-htmlview';


import CommonStyles from "../../styles/CommonStyles";

type Props = {
  title: string,
  image: string,
  text: string,
  longText: string
};
type State = {};

class ItemSingle extends PureComponent<Props, State> {
  render() {
    const { title, image, text, longText } = this.props;
    return (
      <ScrollView>
        <Image source={{uri: image}} style={{width: Screen.width, height: Screen.height / 3 - 27}} />
        <Text style={CommonStyles.textTitle}>{title}</Text>
        <Text style={[CommonStyles.text,{fontFamily: "Merriweather-LightItalic"}]}>{text}</Text>
        <HTMLView
          value={longText}
          stylesheet={{
            p:{
              fontFamily: "Merriweather-Light",
              lineHeight: 21,
              paddingTop: 0,
              paddingRight: 12,
              paddingLeft: 12,
              paddingBottom: 0,
              fontSize:12,
              margin: 6,
              color: "#454546"
            }
          }}
        />
      </ScrollView>
    );
  }
}

export default ItemSingle;
