import React, {Children} from 'react';
import {Platform, TextInput} from 'react-native';

function Input({placeholder, ...props}) {
  return (
    <TextInput
      className={
        Platform.OS === 'ios'
          ? 'self-center border-b-2 border-secondary w-3/4 bg-transparent pl-3 pb-3  mt-12 text-secondary font-lg font-bold'
          : 'self-center border-b-2 border-secondary w-3/4 bg-transparent pl-3 pb-3  mt-3 text-secondary font-lg font-bold'
      }
      placeholder={placeholder}
      placeholderTextColor={'#557089'}
      autoCapitalize="none"
      {...props}
    />
  );
}

export default Input;
