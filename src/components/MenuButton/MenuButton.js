// @flow
import React, { PureComponent } from "react";
import Hamburger from "./Hamburger";

import Styles from "./Styles";

type Props = {
  onToggleDrawer: () => void,
  drawerOpen: boolean,
};
type State = {};

class MenuButton extends PureComponent<Props, State> {
  render() {
    const { onToggleDrawer, drawerOpen } = this.props;
    return (
      <Hamburger active={drawerOpen} onPress={onToggleDrawer}/>
    );
  }
}

export default MenuButton;
