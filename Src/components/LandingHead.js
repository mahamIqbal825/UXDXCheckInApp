import React from 'react';
import {Text, View, Image, Platform} from 'react-native';
import Theme from '../utils/Theme';

function LandingHead(props) {
  return (
    <View
      className={
        Platform.OS == 'ios'
          ? 'flex-row items-center space-x-5 mt-14'
          : 'flex-row items-center space-x-5 mt-8'
      }>
      <Image
        resizeMode={'stretch'}
        source={require('../assets/images/Vector.png')}
        //className={Platform.OS == 'ios' ? 'w-[96] h-[106]' : 'w-[80] h-[90]'}
        style={{height: Theme.hp(11), width: Theme.wp(21)}}
      />
      <View className="flex-col mt-2">
        <Image
          resizeMode={'stretch'}
          source={require('../assets/images/appname.png')}
          style={{height: Theme.hp(6.1), width: Theme.wp('39%')}}
        />
        <Text
          style={{fontSize: Theme.RFValue(22)}}
          className="text-white  font-medium mt-2">
          CHECK IN
        </Text>
      </View>
    </View>
  );
}

export default LandingHead;
