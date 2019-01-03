// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Linking, Image, TouchableOpacity, Text } from "react-native";

import CommonStyles from "../../styles/CommonStyles";
import Styles from "./Styles";

type Props = {
  onOpenAd: () => void,
  onNavigate: (route: string) => void,
  small_add: any
};
type State = {};

class HeaderAd extends PureComponent<Props, State> {
  render() {
    const { onOpenAd, onNavigate, small_add } = this.props;
    return (
      <TouchableOpacity onPress={()=>{
        if (small_add["internal"]) {
          onNavigate(small_add["link_url_en"]);
        } else {
          Linking.openURL(small_add["link_url_en"]);
        }
        }}>
        <Image
          style={Styles.adHolder}
          source={{uri: small_add["img_url_en"]}}
        />
      </TouchableOpacity>
    );
  }
}

export default HeaderAd;
