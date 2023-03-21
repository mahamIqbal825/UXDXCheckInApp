import React from 'react';
import {
  Image,
  Platform,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

function PrimaryButton({onPress, style, loading, text}) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      {loading ? (
        <ActivityIndicator isVisible={loading} size={'small'} color="white" />
      ) : (
        <Text
          className={
            Platform.OS === 'ios'
              ? 'text-white text-2xl font-bold w-50 text-center'
              : 'text-white text-xl font-bold w-50 text-center'
          }>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default PrimaryButton;
