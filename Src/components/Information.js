import React from 'react';
import {View, Text, Platform} from 'react-native';

function Information({name, position, company, dateCreated}) {
  return (
    <View
      className={
        Platform.OS == 'android' ? 'self-left ml-8' : 'self-left ml-14 mt-8'
      }>
      <Text className="text-secondary text-2xl font-medium mt-6 text-left">
        {name}
      </Text>
      <Text className="text-secondary mt-3 text-base font-small text-left italic">
        {position}
      </Text>
      <Text className="text-secondary mt-3 text-base font-medium text-left italic">
        {company}
      </Text>
      <Text className="text-secondary mt-3 text-sm font-normal text-left italic">
        Scanned: {dateCreated}
      </Text>
    </View>
  );
}

export default Information;
