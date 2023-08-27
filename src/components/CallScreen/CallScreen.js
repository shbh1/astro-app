import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CallAction from '../CallAction/CallAction';

const CallScreen = () => {
  return (
    <View style={styles.page}>
      <View style={styles.cameraPreview} />

      <CallAction />
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#7b4e80',
  },
  cameraPreview: {
    width: 110,
    height: 150,
    backgroundColor: '#ffff6e',
    position: 'absolute',
    right: 10,
    top: 100,
    borderRadius: 10,
  },
});
