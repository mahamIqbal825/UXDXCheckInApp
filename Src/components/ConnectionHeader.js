import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Text,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import Theme from '../utils/Theme';

function Header({onPress, onPressD, onPressB}) {
  const [open, setOpen] = React.useState(false);
  const settings = [{label: 'Logout', value: 'Logout'}];
  return (
    <View style={styles.container}>
      <Text className="text-secondary text-2xl font-base  self-center">
        Check In Lists
      </Text>
      <View style={{width: '15%', flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={onPress}>
          <Image
            className="h-[20] w-[19]"
            source={require('../assets/images/search.png')}
          />
        </TouchableOpacity>
        <DropDownPicker
          placeholder={
            <Image
              style={{height: 23, width: 5}}
              source={require('../assets/images/dots.png')}
            />
          }
          containerStyle={styles.dropDownContainer}
          showArrowIcon={false}
          open={open}
          items={settings}
          setOpen={setOpen}
          renderListItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={onPressD}
                // style={styles.listItemStyle}
              >
                <Text style={styles.text}>{item.label}</Text>
              </TouchableOpacity>
            );
          }}
          style={{
            borderWidth: 0,
            backgroundColor: 'transparent',
          }}
          dropDownContainerStyle={styles.dropDownStyle}
        />
      </View>
    </View>
  );
}

export default Header;
const styles = StyleSheet.create({
  container: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginLeft: 20,
    marginTop: Platform.OS === 'ios' ? Theme.dh * 0.06 : Theme.dh * 0.03,
  },
  dropDownContainer: {
    //width: Theme.wp('12%'),
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginLeft: Theme.wp('4%'),
    // marginTop: Theme.hp(0.6),
    backgroundColor: 'transparent',
  },
  dropDownStyle: {
    width: Theme.wp('40%'),
    alignSelf: 'flex-end',
    borderWidth: 0,
    marginRight: Theme.wp(5),
    elevation: 5,
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 0.3,
      width: 0.1,
    },
  },
  listItemStyle: {
    paddingVertical: Theme.hp('1%'),
    paddingHorizontal: Theme.wp('1%'),
  },
  text: {
    fontSize: 17,
    alignSelf: 'center',
    paddingVertical: Theme.hp('1%'),
    paddingHorizontal: Theme.wp('1%'),
    fontWeight: '600',
    color: Theme.primaryColor,
  },
});
