// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import HeaderAd from "../../components/HeaderAd/";
import ItemList from "../../components/ItemList/";

import CommonStyles from "../../styles/CommonStyles";


type Props = {
  infos: Array<any>,
  language: string,
};
type State = {};

class Info extends PureComponent<Props, State> {
  render() {
    const { infos } = this.props;

    const language = this.props.language === 'en' ? 'en' : 'rs';

    return (
        <View style={CommonStyles.container}>
            <HeaderAd />
            <ItemList 
            items={infos}
            slug="/info-single/"
            />
      </View>
    );
  }
}

export default Info;
