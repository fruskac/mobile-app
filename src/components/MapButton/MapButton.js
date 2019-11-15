import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '../../components/Icon/Icon';
import * as Icons from '../../styles/Icons';

class MapButton extends Component {
  render() {
    const { onPress, iconName, styles} = this.props;
    return (
      <TouchableOpacity
        style={styles}
        onPress={() => onPress()}
      >
        <Icon
          name={iconName}
          size={30}
          color={Icons.colors.darkGrey}
        />
      </TouchableOpacity>
    );
  }
}

export default MapButton;