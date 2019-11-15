import React, { PureComponent } from 'react';
import Drawer from 'react-native-drawer';

import AppWithActions from '../../AppWithActions';
import Menu from '../Menu';
import Styles from './Styles';

class SideMenu extends PureComponent {
  render() {
    const { onCloseDrawer, drawerOpen } = this.props;
    return (
      <Drawer
        content={<Menu inDrawer />}
        type='overlay'
        acceptPan={false}
        open={drawerOpen}
        onClose={onCloseDrawer}
        openDrawerOffset={0.3}
        acceptTap={true}
        styles={Styles}
      >
        <AppWithActions />        
      </Drawer>
    );
  }
}

export default SideMenu;
