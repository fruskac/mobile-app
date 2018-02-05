import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { FlatList, Image, View, Text } from "react-native";

import { NewsData } from "../News/News";
import * as Screen from "../../utils/Screen";
import Styles from "./Styles";

type Props = {
  data: NewsData
};
type State = {};

class ItemList extends PureComponent<Props> {
  static defaultProps = {};

  _keyExtractor = (item, index) => index;

  _renderItem = ({ item }) => (
    <View style={Styles.itemHolder}>
      <Image
        style={Styles.itemImg}
        source={{ uri: item.imageUrl }}
        resizeMode="cover"
      />
      <Text style={Styles.itemText}>
        {item["title_" + this.props.language]} asdasdas
      </Text>
    </View>
  );

  render() {
    const { data, language } = this.props;

    return (
      <FlatList
        data={data}
        extraData={{ language }}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

export default ItemList;
