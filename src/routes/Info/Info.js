// @flow

import React, { PureComponent } from "react";
import { View } from "react-native";

import HeaderAd from "../../components/HeaderAd/";
import ItemList from "../../components/ItemList/";

import CommonStyles from "../../styles/CommonStyles";


type Props = {
  infos: Array<any>,
  language: string,
  onFetchInfos: (language: string) => void,
};
type State = {};

class Info extends PureComponent<Props, State> {
  componentDidMount() {
    this.props.onFetchInfos(this.props.language === 'en' ? 'en' : 'rs');
  }

  render() {
    const { infos } = this.props;

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
