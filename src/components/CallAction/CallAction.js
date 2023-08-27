import {StyleSheet, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CallAction = () => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const onCameraOff = () => {
    setIsCameraOn(currentValue => !currentValue);
  };

  const onReverseCamera = () => {
    console.warn('reverse camera');
  };

  const onMicOff = () => {
    setIsMicOn(currentValue => !currentValue);
  };

  const onHangup = () => {
    console.warn('On HangUp');
  };
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.iconButton} onPress={onReverseCamera}>
        <Ionicons name="camera-reverse" size={30} color={'white'} />
      </Pressable>
      <Pressable style={styles.iconButton} onPress={onCameraOff}>
        <MaterialCommunityIcons
          name={isCameraOn ? 'camera-off' : 'camera'}
          size={30}
          color={'white'}
        />
      </Pressable>
      <Pressable style={styles.iconButton} onPress={onMicOff}>
        <Ionicons
          name={isMicOn ? 'mic-off' : 'mic-sharp'}
          size={30}
          color={'white'}
        />
      </Pressable>
      <Pressable
        onPress={onHangup}
        style={[styles.iconButton, {backgroundColor: 'red'}]}>
        <MaterialCommunityIcons name="phone-hangup" size={30} color={'white'} />
      </Pressable>
    </View>
  );
};

export default CallAction;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#333333',
    padding: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  iconButton: {
    backgroundColor: '#4a4a4a',
    padding: 15,
    borderRadius: 50,
  },
});
