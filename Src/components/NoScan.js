import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import Theme from '../utils/Theme';
import PrimaryButton from './PrimaryButton';
function NoScan({onPress}) {
  return (
    <View className="flex-1 items-center justify-center ">
      <Text className="text-secondary -mt-48 text-2xl font-bold ">
        You Have No
      </Text>
      <Text className="text-secondary text-2xl font-bold mt-1 ">
        Scans Yet.
      </Text>
      <Image
        resizeMode={'contain'}
        source={require('../assets/images/inkList.png')}
        style={styles.imageBg}
      />
      <PrimaryButton
        text={'Return to Scanner'}
        className="h-[50] w-[294] bg-secondary mt-10 rounded-lg items-center justify-center"
        onPress={onPress}
      />
    </View>
  );
}

export default NoScan;
const styles = StyleSheet.create({
  imageBg: {
    height: Platform.OS === 'ios' ? 280 : 257,
    width: Theme.dw,
    position: 'absolute',
    zIndex: -1,
    bottom: 0,
  },
});
