import React from 'react';
import {Text, StyleSheet} from 'react-native';

function ErrorMessage({error, visible}) {
  if (!visible || !error) return null;
  return (
    <Text className="text-red-500 text-small font-bold mt-3 self-center">
      {error}
    </Text>
  );
}

export default ErrorMessage;
