import React from 'react';
import {Text, TouchableOpacity, Image, Platform, View} from 'react-native';

function GoogleButton({onPress, style, googleSignIn, text, scan}) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Image
        source={require('../assets/images/image.png')}
        className="w-[29] h-[29]"
      />
      <Text
        className={
          Platform.OS === 'ios'
            ? 'text-secondary  text-xl font-bold text-center'
            : 'text-secondary  text-xl font-bold text-center'
        }>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export default GoogleButton;
