import React, { PureComponent } from "react";
import type { Node } from "react";
import PropTypes from "prop-types";
import { FlatList, Image, View, Text, TouchableOpacity } from "react-native";

import type NewsData from "../../routes/News/News";
import type LocationData from "../../types";
import * as Screen from "../../utils/Screen";
import Styles from "./Styles";

type Props = {
  items: NewsData | LocationData,
  slug: string,
  language: string,
  header: Node,
  footer: Node,
  onNavigate: (route: string) => void
};
type State = {};

class ItemList extends PureComponent<Props> {
  static defaultProps = {
    header: null,
    footer: null
  };

  _keyExtractor = (item, index) => index;

  _renderItem = ({ item }) => {
    const { slug, onNavigate, language } = this.props;

    // for rendering header and footer elements which can be null
    // of if present they would not have id
    if (!item || !("id" in item)) return item;

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
    const { items, language, header, footer, ...rest } = this.props;

    return (
      <FlatList
        {...rest}
        style={{ flex: 1 }}
        data={[header].concat(items).concat(footer)}
        extraData={{ language }}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

export default ItemList;
