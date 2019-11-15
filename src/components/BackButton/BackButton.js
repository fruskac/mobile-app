import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '../Icon/Icon';

import Styles from './Styles';

class BackButton extends PureComponent {
  render() {
    const { onNavigateBack } = this.props;
    return (
      <TouchableOpacity style={Styles.buttonHolder} onPress={onNavigateBack}>
        <Icon 
          name={'icon-left'}
          size={32}
          style={Styles.icon}
        />
      </TouchableOpacity>
    );
  }
}

export default BackButton;
