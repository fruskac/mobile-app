import React, { PureComponent } from "react";
import type { Node } from "react";
import { FlatList, View, Image, Text, TouchableOpacity } from "react-native";
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image';

import Styles from "./Styles";

type Props = {
  items: Array<any>,
  slug: string,
  language: string,
  header: Node,
  footer: Node,
  onNavigate: (route: string) => void,
  hasInternet: boolean,
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
        
          {this.props.hasInternet ? 
            <Image
              style={Styles.itemImg}
              source={{ uri: item.image || item.imageUrl }}
              resizeMode="cover"
            />
            : 
            <ImageCacheProvider
              urlsToPreload={[item.image]}
            >
              <CachedImage
                style={Styles.itemImg}
                source={{ uri: item.image || item.imageUrl }}
                resizeMode="cover"
              />
            </ImageCacheProvider>
          }
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
