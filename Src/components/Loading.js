import React from 'react';
import {View, Image, ActivityIndicator, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

function Loading({isVisible, loading, success}) {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.8}>
      <View style={styles.modal}>
        {loading ? (
          <ActivityIndicator
            isVisible={loading}
            size={'large'}
            color="#31C48D"
          />
        ) : null}
        {success ? (
          <Image
            source={require('../assets/images/Icon.png')}
            style={styles.image}
          />
        ) : null}
      </View>
    </Modal>
  );
}

export default Loading;
const styles = StyleSheet.create({
  modal: {
    flex: 0.08,
    backgroundColor: 'white',
    width: '17%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',
  },
  image: {
    height: 18,
    width: 18,
  },
});
