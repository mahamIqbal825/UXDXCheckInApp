import React from 'react';
import {Text, TouchableOpacity, Image, Platform, View} from 'react-native';

function SecondaryButton({onPress, style, googleSignIn, text, scan}) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text
        className={
          Platform.OS === 'ios'
            ? 'text-secondary  text-2xl font-bold  w-40 text-center'
            : 'text-secondary  text-xl font-bold  w-40 text-center'
        }>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export default SecondaryButton;
