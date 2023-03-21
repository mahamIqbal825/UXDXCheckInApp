import React, {useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Linking,
  Image,
} from 'react-native';
import LandingHead from '../components/LandingHead';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Theme from '../utils/Theme';

function Landing({navigation}) {
  return (
    <View className="flex-1 ">
      <ImageBackground
        source={require('../assets/images/Vector1.png')}
        style={styles.image}
        className=" items-center"
        resizeMode={'stretch'}>
        <LandingHead />
      </ImageBackground>

      <View className="flex-col mt-4 flex-1 justify-center items-center">
        <PrimaryButton
          text={'Log in'}
          className="h-[50] w-[213] bg-secondary rounded-lg items-center justify-center"
          onPress={() => navigation.navigate('SignIn')}
        />
        <SecondaryButton
          text={'Register'}
          className="h-[50] w-[213] bg-white rounded-lg border-2 border-secondary items-center justify-center mt-4"
          onPress={() => Linking.openURL('https://uxdx.com/register')}
        />
      </View>
      <Image
        source={require('../assets/images/Ink.png')}
        style={{
          height: Theme.hp(60),
          width: '100%',
          marginTop: -Theme.dh * 0.05,
          bottom: 0,
          position: 'absolute',
          zIndex: -1,
        }}
        resizeMode={'stretch'}
      />
      {/* </ImageBackground> */}
    </View>
  );
}

export default Landing;
const styles = StyleSheet.create({
  image: {
    height: Theme.dh * 0.4,
    width: '100%',
  },
});
