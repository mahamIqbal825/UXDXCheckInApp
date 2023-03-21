import React from 'react';
import {
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Theme from '../utils/Theme';

function IconButton({onPress, style, image, text, color}) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <View style={styles.icon}>
        <Image source={image} style={{height: 30, width: 30}} />
      </View>

      <Text
        style={[styles.text, {color: color}]}
        className={
          Platform.OS === 'ios'
            ? 'text-2xl font-bold w-50 text-center'
            : ' text-xl font-bold w-50 text-center'
        }>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export default IconButton;
const styles = StyleSheet.create({
  icon: {
    width: '20%',
    alignItems: 'center',
    marginLeft: Theme.dw * 0.04,
  },
  text: {
    width: '60%',
  },
});
