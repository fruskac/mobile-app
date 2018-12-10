// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import HeaderAd from "../../components/HeaderAd/";
import ItemList from "../../components/ItemList/";

import CommonStyles from "../../styles/CommonStyles";

type Props = {
  tracks: Array<any>,
  language: string,
};
type State = {};

class Tracks extends PureComponent<Props, State> {

  render() {
    const { tracks } = this.props;

    const language = this.props.language === 'en' ? 'en' : 'rs';
    
    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
        <ItemList 
          items={tracks}
          slug="/track-single/"
        />
      </View>
    );
  }
}

export default Tracks;
