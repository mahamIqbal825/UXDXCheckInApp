import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Theme from '../utils/Theme';

const height = Dimensions.get('screen').height;

function List({name, time, intro, company, onPress, categorey, heading}) {
  return (
    <TouchableOpacity style={styles.cont} onPress={onPress}>
      <View style={styles.innerCont}>
        <Text className="text-base mt-4 mb-2 font-large text-secondary">
          {heading}
        </Text>
      </View>
      <TouchableOpacity
        style={{width: '97%'}}
        className="flex-row items-center mt-5 justify-between">
        <Text className="text-base ml-1 font-medium text-secondary">
          {categorey}
        </Text>
        <Image
          className="h-[18] w-[11] "
          source={require('../assets/images/next.png')}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{width: '97%'}}
        className="flex-row items-center mt-4 mb-5 justify-between">
        <Text className="text-base ml-1 font-medium text-secondary">
          {'After Party'}
        </Text>
        <Image
          className="h-[18] w-[11] "
          source={require('../assets/images/next.png')}
        />
      </TouchableOpacity> */}
      {/* <Text
        className="text-medium mt-1 font-medium text-secondary"
        numberOfLines={1}>
        {intro}
      </Text>
      <Text
        className="mb-2 text-medium font-bold text-secondary"
        numberOfLines={1}>
        {company}
      </Text> */}
    </TouchableOpacity>
  );
}

export default List;
const styles = StyleSheet.create({
  cont: {
    width: '75%',
    alignSelf: 'center',
    borderBottomColor: '#2D9CDB',
    borderBottomWidth: 1,
    //marginTop: Theme.dh * 0.03,
  },
  innerCont: {
    width: '100%',
    alignSelf: 'center',
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: 1,
    marginTop: Theme.dh * 0.01,
  },
});
