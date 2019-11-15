import React, { PureComponent } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import Image from '../Image';

import Styles from './Styles';

class ItemList extends PureComponent {
  static defaultProps = {
    header: null,
    footer: null
  };

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({ item }) => {
    const { slug, onNavigate, language } = this.props;

    // for rendering header and footer elements which can be null
    // of if present they would not have id
    if (!item || !('id' in item)) return item;

    return (
      <TouchableOpacity
        onPress={() => {
          onNavigate(slug + item.id);
        }}
      >
        <View style={Styles.itemHolder}>
          <Image
            styles={Styles.itemImg}
            imgUrl={item.image || item.imageUrl}
          />
          <Text style={Styles.itemText}>
            {item.title || item['title_' + language]}
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
        style={Styles.flatList}
        data={[header].concat(items).concat(footer)}
        extraData={{ language }}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

export default ItemList;
