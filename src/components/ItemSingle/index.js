// @flow

import React, { PureComponent } from "react";
import { Dimensions, Text, ScrollView, Image } from "react-native";
import * as Screen from "../../utils/Screen";
import HTML from 'react-native-render-html';


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
    let { title, image, text, longText } = this.props;
    console.disableYellowBox = true;
    return (
      <ScrollView>
        <Image source={{uri: image}} style={{width: Screen.width, height: Screen.height / 3 - 27}} />
        <Text style={CommonStyles.textTitle}>{title}</Text>
        <Text style={[CommonStyles.text,{fontFamily: "Merriweather-LightItalic"}]}>{text}</Text>
        <HTML
          html={
            longText
              .replace(new RegExp('<li', 'g'), '<li><i')
              .replace(new RegExp('</li>', 'g'), '</i></li>')
              .replace(new RegExp('<p><iframe', 'g'), '<div><iframe')
              .replace(new RegExp('</iframe></p>', 'g'), '</iframe></div>')
              .replace(new RegExp('="/sites/', 'g'), '="https://fruskac.net/sites/')
            }
          imagesMaxWidth={Dimensions.get('window').width}
          tagsStyles={{
            h1: {
              margin: 6
            },
            h2: {
              margin: 9
            },
            h3: {
              margin: 12
            },
            h4: {
              margin: 15
            },
            p: {
              fontFamily: "Merriweather-Light",
              lineHeight: 21,
              paddingTop: 9,
              paddingRight: 12,
              paddingLeft: 12,
              paddingBottom: 0,
              fontSize:12,
              margin: 6,
              color: "#454546",
              textAlign: "justify",
              textJustify: "inter-word"
            },
            strong: {
              fontFamily: "Merriweather-LightItalic",
              fontSize: 12.6,
              color: "#272730",
              lineHeight: 30
            },
            div: {
              position: 'relative',
              margin: 6
            },
            i: {
              fontFamily: "Merriweather-Light",
              lineHeight: 21,
              fontSize: 12,
              color: "#212121"
            }
          }}
        />
      </ScrollView>
    );
  }
}

export default ItemSingle;
