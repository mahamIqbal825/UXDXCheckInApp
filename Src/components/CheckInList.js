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

function CheckInList({
  name,
  id,
  email,
  attendee,
  onPress,
  isCheckIn,
  checkInPress,
}) {
  return (
    <TouchableOpacity style={styles.cont} onPress={onPress}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text className="text-xl font-medium text-secondary">{name}</Text>
        {isCheckIn ? (
          <Image
            source={require('../assets/images/checked.png')}
            style={{
              tintColor: '#53B10A',
              height: 18.4,
              width: 18.4,
            }}
          />
        ) : (
          <TouchableOpacity onPress={checkInPress}>
            <Image
              source={require('../assets/images/Button.png')}
              style={{height: 34, width: 120}}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text
        className="text-sm mt-2 font-medium"
        style={{color: '#66696B'}}
        numberOfLines={1}>
        {email}
      </Text>

      <Text
        className="mb-2 mt-1 text-medium font-light text-secondary"
        numberOfLines={1}>
        {attendee}
      </Text>
      <Text className="mb-5 mt-1 text-sm font-medium text-secondary">{id}</Text>
    </TouchableOpacity>
  );
}

export default CheckInList;
const styles = StyleSheet.create({
  cont: {
    width: '80%',
    alignSelf: 'center',
    borderBottomColor: '#66696B',
    borderBottomWidth: 1,
    marginTop: Theme.dh * 0.03,
  },
});
