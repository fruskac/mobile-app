import React, { PureComponent } from 'react';
import { View } from 'react-native';
import I18n from 'react-native-i18n';
import { CheckBox } from 'react-native-elements';
import * as Icons from '../../styles/Icons';
import Styles from './Styles';

const allFilters = ['lookouts', 'monuments', 'lakes', 'monasteries', 'picnic-areas', 'misc', 'meadows', 'waterfalls', 'springs', 'fishponds',
  'mountain-huts', 'restaurants', 'households', 'wineries'];

class MapFilters extends PureComponent {

    updateFilters = (filterName) => {
      let newFilters = Array.from(this.props.activeFilters);
      var index = newFilters.indexOf(filterName);
      if (index !== -1) {
        newFilters.splice(index, 1);
      } else {
        newFilters.push(filterName);
      }

      this.props.updateActiveFilters(newFilters);
    }

    render() {
      const { activeFilters } = this.props;
        return(
          <View
          style={Styles.filtersContainer}>
          {allFilters.map((filter, index) =>
            <View style={Styles.filters}>
              <CheckBox
                key={index}
                textStyle={Styles.checkBoxText}
                containerStyle={Styles.checkBoxContainer}
                title={I18n.t(filter)}
                checked={activeFilters.includes(filter)}
                checkedColor={Icons.colors[filter.replace('-', '')]}
                onPress={() => this.updateFilters(filter)}
              />
            </View>)}
        </View>
        );
    }
}

export default MapFilters;