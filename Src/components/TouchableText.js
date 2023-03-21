import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

function TouchableText({text, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text className="text-lg text-secondary underline font-bold self-center mt-10 ">
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export default TouchableText;
