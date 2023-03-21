import React from 'react';
import {Text, Platform} from 'react-native';

function Heading({text, style}) {
  return (
    <Text
      style={style}
      className={
        Platform.OS === 'ios'
          ? 'text-secondary text-4xl font-bold  self-center'
          : 'text-secondary text-3xl font-bold  self-center'
      }>
      {text}
    </Text>
  );
}

export default Heading;
