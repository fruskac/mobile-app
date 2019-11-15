import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import I18n from 'react-native-i18n';
import * as Icons from '../../styles/Icons';
import Icon from '../../components/Icon/Icon';
import HeaderAd from '../../components/HeaderAd/';

import CommonStyles, {
  navHeaderHeight,
  headerAdHeight,
  accentColor,
  defaultMargin
} from '../../styles/CommonStyles';
import Styles, { menuHeight } from './Styles';
import { height as screenHeight } from '../../utils/Screen';

class Locations extends PureComponent {
  componentDidMount = () => {
    this.props.onFetchLocations('rs');
    this.props.onFetchMap('rs');
  }

  render() {
    const { tags, filter,  onNavigate, onLocationTypeChange, places, map } = this.props;
    // caluclate button height for button with icons
    const buttonHeight =
      (screenHeight - navHeaderHeight - headerAdHeight - menuHeight - defaultMargin - 10) /
       Math.floor((tags.length + 1) / 2);

    let typeStyle = {}, placeStyle = {};

    const underlineStyle = {
      borderBottomColor: accentColor,
      borderBottomWidth: 2
    };

    filter == 'type'
      ? (typeStyle = underlineStyle)
      : (placeStyle = underlineStyle);

    if (filter == 'type') {
      listView = 
      <View style={Styles.menu}>
        {tags.map((tag, index) => (
          <TouchableOpacity
            onPress={() => {
              onNavigate('/location/' + tag.key);
            }}
            key={index}
            style={[
              Styles.menuItem,
              { padding: 12},
              { height: buttonHeight, padding: 3 },
              index % 2 === 0 ? Styles.withRightBorder : {}
            ]}
          >
            <Icon style={{top: 6}}
              name={tag.key.replace('-', '')}
              size={45}
              color={Icons.colors[tag.key.replace('-', '')]}
            />
            <Text style={[CommonStyles.text, Styles.textTitle ]}>{I18n.t(tag.key)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    } else {
      listView = 
      <ScrollView style={[Styles.menu,{flex: 1, flexDirection: 'column'}]}>
        {places.map((t, index) => (
          <TouchableOpacity
            onPress={() => {
              onNavigate('/location/' + t['name']);
            }}
            key={index}
          >
            <Text style={Styles.textPlacesList}> {t[`name`]} ({map.filter(location => location.place == t.name).length }) </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    }

    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
        <View style={Styles.topMenu}>
          <TouchableOpacity
            key='type'
            style={[Styles.topMenuItem, Styles.withRightBorder, typeStyle]}
            onPress={() => onLocationTypeChange('type')}
          >
            <Text style={CommonStyles.textTabs}>{I18n.t('type')}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            key='place'
            style={[Styles.topMenuItem, placeStyle]}
            onPress={() => onLocationTypeChange('place')}
          >
            <Text style={CommonStyles.textTabs}>{I18n.t('place')}</Text>
          </TouchableOpacity>
        </View>
        {listView}
      </View>
    );
  }
}

export default Locations;
