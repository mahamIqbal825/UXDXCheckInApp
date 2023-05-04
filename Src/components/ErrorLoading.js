import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';

function ErrorLoading({isVisible, onPress, error}) {
  console.log(isVisible, onPress, error)
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.8}>
      <View className="h-[90] w-[270] bg-white items-center justify-center rounded-lg self-center">
        <View className="w-full flex-row items-center justify-evenly">
          <Image
            source={require('../assets/images/danger.png')}
            style={styles.image}
          />
          <Text className="text-md text-black font-medium">{error}</Text>
          <TouchableOpacity onPress={() => onPress}>
            <Image
              source={require('../assets/images/cross.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <Text className="text-md text-errorText font-medium">
          Close and retry
        </Text>
      </View>
    </Modal>
  );
}

export default ErrorLoading;
const styles = StyleSheet.create({
  image: {
    height: 16,
    width: 16,
  },
});
