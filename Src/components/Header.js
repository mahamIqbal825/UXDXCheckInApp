import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import Theme from '../utils/Theme';
function Header({isHeader, onPress}) {
  return (
    <View style={styles.container}>
      {isHeader ? (
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require('../assets/images/backIcon.png')}
            className="h-[18] w-[11]"
          />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../assets/images/LogoSec.png')}
          //  className="h-[51] w-[46]"
          resizeMode={'stretch'}
          style={{height: Theme.hp(6.5), width: Theme.wp('13%')}}
        />
        <Image
          source={require('../assets/images/blackText.png')}
          className="h-[21] w-[72] ml-3"
        />
      </View>
      <View></View>
    </View>
  );
}

export default Header;
const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginTop: Platform.OS === 'ios' ? Theme.dh * 0.06 : Theme.dh * 0.03,
  },
});
