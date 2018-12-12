// @flow

import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import I18n from "react-native-i18n";

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
            { infos ?
              <ItemList 
                  items={infos}
                  slug="/info-single/"
              />
            : <Text>{I18n.t("loading")}</Text>
            }
            
      </View>
    );
  }
}

export default Info;
