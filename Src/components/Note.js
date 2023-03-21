import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

function Note({style, note, ...children}) {
  return (
    <View style={style}>
      <Text className="text-left text-secondary text-base font-small">
        NOTES
      </Text>
      <View className="h-[180] w-[285] border-2 border-secondary bg-white rounded">
        <TextInput
          className="text-secondary"
          style={styles.text}
          numberOfLines={400}
          autoCapitalize={'sentences'}
          multiline
          //defaultValue={note}
          editable={true}
          {...children}></TextInput>
      </View>
    </View>
  );
}

export default Note;
const styles = StyleSheet.create({
  text: {
    textAlignVertical: 'top',
    padding: 10,
  },
});
