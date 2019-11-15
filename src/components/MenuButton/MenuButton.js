import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Hamburger from './Hamburger';

import Styles from './Styles';

class MenuButton extends PureComponent {
  render() {
    const { onToggleDrawer, drawerOpen } = this.props;
    return (
      <View style={Styles.buttonHolder}>
        <Hamburger active={drawerOpen} onPress={onToggleDrawer} />
      </View>
    );
  }
}

export default MenuButton;
