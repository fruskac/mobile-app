import React, { PureComponent } from 'react';
import { View } from 'react-native';

import Menu from '../../components/Menu';
import CommonStyles from '../../styles/CommonStyles';

class Home extends PureComponent {
  render() {
    return (
      <View style={CommonStyles.container}>
        <Menu />
      </View>
    );
  }
}

export default Home;
