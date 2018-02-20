import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { FlatList, Image, View, Text, TouchableOpacity } from "react-native";

import type NewsData from "../../routes/News/News";
import type LocationData from "../../routes/LocationTypePlace/LocationTypePlace";
import * as Screen from "../../utils/Screen";
import Styles from "./Styles";

type Props = {
  items: NewsData | LocationData,
  slug: string,
  language: string,
  onNavigate: (route: string) => void
};
type State = {};

class ItemList extends PureComponent<Props> {
  static defaultProps = {};

  _keyExtractor = (item, index) => index;

  _renderItem = ({ item }) => {
    const { slug, onNavigate, language } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          onNavigate(slug + item.id);
        }}
      >
        <View style={Styles.itemHolder}>
          <Image
            style={Styles.itemImg}
            source={{ uri: item.image || item.imageUrl }}
            resizeMode="cover"
          />
          <Text style={Styles.itemText}>
            {item.title || item["title_" + language]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { items, language } = this.props;

    console.log("items", items, language);

    return (
      <FlatList
        style={{ flex: 1 }}
        data={items}
        extraData={{ language }}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

export default ItemList;
