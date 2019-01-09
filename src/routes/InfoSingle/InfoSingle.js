// @flow

import React, { PureComponent } from "react";
import { View } from "react-native";

import HeaderAd from "../../components/HeaderAd/";
import ItemSingle from "../../components/ItemSingle/";

import CommonStyles from "../../styles/CommonStyles";

type Props = {
  id: string,
  data: any,
  onNavigate: (route: string) => void,
  navigation: any,
  language: string
};
type State = {};

class InfoSingle extends PureComponent<Props, State> {
  render() {
    const { data } = this.props;
    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
        <ItemSingle
          image={data.image}
          title={data.title}
          text={data.description}
          longText={data.description_long}
        />
      </View>
    );
  }
}

export default InfoSingle;
